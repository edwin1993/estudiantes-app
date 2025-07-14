import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from '../../domain/entities/enrollment.entity';
import { Course } from '../../domain/entities/course.entity';
import { CreateEnrollmentDto } from '../../application/dto/enrollment.dto';
import { IEnrollmentRepository } from '../../domain/repositories/enrollment-repository.interface';

@Injectable()
export class EnrollmentRepository implements IEnrollmentRepository {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentRepository: Repository<Enrollment>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async create(createEnrollmentDto: CreateEnrollmentDto): Promise<Enrollment> {
    // Verificar que el estudiante no esté inscrito en más de 3 materias
    const currentEnrollments = await this.getActiveEnrollmentsByStudent(createEnrollmentDto.studentId);
    if (currentEnrollments.length >= 3) {
      throw new BadRequestException('El estudiante ya está inscrito en 3 materias. No puede inscribirse en más.');
    }

    // Verificar que no esté inscrito en la misma materia
    const existingEnrollment = await this.enrollmentRepository.findOne({
      where: {
        studentId: createEnrollmentDto.studentId,
        courseId: createEnrollmentDto.courseId,
        status: 'active',
      },
    });

    if (existingEnrollment) {
      throw new BadRequestException('El estudiante ya está inscrito en esta materia.');
    }

    // Verificar que no tenga clases con el mismo profesor
    const course = await this.courseRepository.findOne({
      where: { id: createEnrollmentDto.courseId },
      relations: ['professor'],
    });

    if (course) {
      const professorEnrollments = await this.getEnrollmentsByProfessorAndStudent(
        course.professor.id,
        createEnrollmentDto.studentId,
      );

      if (professorEnrollments.length > 0) {
        throw new BadRequestException('El estudiante ya tiene clases con este profesor.');
      }
    }

    // Calcular el precio total
    const coursePrice = course ? course.credits * course.creditPriceUSD : 0;

    const enrollment = this.enrollmentRepository.create({
      ...createEnrollmentDto,
      enrollmentDate: new Date(createEnrollmentDto.enrollmentDate),
      totalPriceUSD: coursePrice,
    });

    return await this.enrollmentRepository.save(enrollment);
  }

  async getActiveEnrollmentsByStudent(studentId: string): Promise<Enrollment[]> {
    return await this.enrollmentRepository.find({
      where: { studentId, status: 'active' },
      relations: ['course', 'course.professor'],
    });
  }

  async getEnrollmentsByProfessorAndStudent(professorId: string, studentId: string): Promise<Enrollment[]> {
    return await this.enrollmentRepository
      .createQueryBuilder('enrollment')
      .leftJoinAndSelect('enrollment.course', 'course')
      .where('course.professorId = :professorId', { professorId })
      .andWhere('enrollment.studentId = :studentId', { studentId })
      .andWhere('enrollment.status = :status', { status: 'active' })
      .getMany();
  }

  async getClassmatesByCourse(courseId: string, excludeStudentId?: string): Promise<string[]> {
    const query = this.enrollmentRepository
      .createQueryBuilder('enrollment')
      .leftJoinAndSelect('enrollment.student', 'student')
      .where('enrollment.courseId = :courseId', { courseId })
      .andWhere('enrollment.status = :status', { status: 'active' });

    if (excludeStudentId) {
      query.andWhere('enrollment.studentId != :excludeStudentId', { excludeStudentId });
    }

    const enrollments = await query.getMany();
    return enrollments.map(enrollment => 
      `${enrollment.student.firstName} ${enrollment.student.lastName}`
    );
  }

  async getStudentEnrollmentDetails(studentId: string) {
    return await this.enrollmentRepository
      .createQueryBuilder('enrollment')
      .leftJoinAndSelect('enrollment.course', 'course')
      .leftJoinAndSelect('course.professor', 'professor')
      .where('enrollment.studentId = :studentId', { studentId })
      .andWhere('enrollment.status = :status', { status: 'active' })
      .getMany();
  }

  async cancelEnrollment(enrollmentId: string): Promise<void> {
    await this.enrollmentRepository.update(enrollmentId, { status: 'cancelled' });
  }
} 