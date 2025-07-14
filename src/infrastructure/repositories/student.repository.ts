import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../../domain/entities/student.entity';
import { CreateStudentDto, UpdateStudentDto } from '../../application/dto/student.dto';
import { StudentFinancialSummaryDto } from '../../application/dto/student-financial-summary.dto';
import { IStudentRepository } from '../../domain/repositories/student-repository.interface';

@Injectable()
export class StudentRepository implements IStudentRepository {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const student = this.studentRepository.create({
      ...createStudentDto,
      dateOfBirth: new Date(createStudentDto.dateOfBirth),
    });
    return await this.studentRepository.save(student);
  }

  async findAll(): Promise<Student[]> {
    return await this.studentRepository.find({
      where: { isActive: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string): Promise<Student | null> {
    return await this.studentRepository.findOne({
      where: { id, isActive: true },
      relations: ['enrollments', 'enrollments.course', 'enrollments.course.professor'],
    });
  }

  async findByEmail(email: string): Promise<Student | null> {
    return await this.studentRepository.findOne({
      where: { email, isActive: true },
    });
  }

  async update(id: string, updateStudentDto: UpdateStudentDto): Promise<Student | null> {
    const updateData: any = { ...updateStudentDto };
    
    if (updateStudentDto.dateOfBirth) {
      updateData.dateOfBirth = new Date(updateStudentDto.dateOfBirth);
    }

    await this.studentRepository.update(id, updateData);
    return await this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.studentRepository.update(id, { isActive: false });
  }

  async getStudentEnrollments(studentId: string) {
    return await this.studentRepository
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.enrollments', 'enrollment')
      .leftJoinAndSelect('enrollment.course', 'course')
      .leftJoinAndSelect('course.professor', 'professor')
      .where('student.id = :studentId', { studentId })
      .andWhere('student.isActive = :isActive', { isActive: true })
      .andWhere('enrollment.status = :status', { status: 'active' })
      .getOne();
  }

  async getStudentFinancialSummary(studentId: string): Promise<StudentFinancialSummaryDto | null> {
    try {
      const result = await this.studentRepository.query(
        'CALL GetStudentFinancialSummary(?)',
        [studentId]
      );
      
      if (result && result[0] && result[0].length > 0) {
        const summary = result[0][0];
        return {
          student_id: summary.student_id,
          firstName: summary.firstName,
          lastName: summary.lastName,
          email: summary.email,
          total_courses: summary.total_courses || 0,
          total_credits: summary.total_credits || 0,
          total_price_usd: summary.total_price_usd || 0,
          total_price_eur: summary.total_price_eur || 0,
          average_credit_price: summary.average_credit_price || 0,
          last_enrollment_date: summary.last_enrollment_date,
          first_enrollment_date: summary.first_enrollment_date,
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error al ejecutar el procedimiento almacenado:', error);
      return null;
    }
  }
} 