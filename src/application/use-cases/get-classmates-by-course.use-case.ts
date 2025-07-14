import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IStudentRepository } from '../../domain/repositories/student-repository.interface';
import { IEnrollmentRepository } from '../../domain/repositories/enrollment-repository.interface';
import { CourseClassmatesDto } from '../dto/enrollment.dto';
import { STUDENT_REPOSITORY, ENROLLMENT_REPOSITORY } from '../../domain/repositories/repository.tokens';

@Injectable()
export class GetClassmatesByCourseUseCase {
  constructor(
    @Inject(STUDENT_REPOSITORY)
    private readonly studentRepository: IStudentRepository,
    @Inject(ENROLLMENT_REPOSITORY)
    private readonly enrollmentRepository: IEnrollmentRepository,
  ) {}

  async execute(courseId: string, studentId: string): Promise<CourseClassmatesDto> {
    const student = await this.studentRepository.findById(studentId);
    if (!student) {
      throw new NotFoundException('Estudiante no encontrado.');
    }

    const classmates = await this.enrollmentRepository.getClassmatesByCourse(courseId, studentId);
    
    // Obtener el nombre del curso
    const enrollments = await this.enrollmentRepository.getStudentEnrollmentDetails(studentId);
    const course = enrollments.find(e => e.course.id === courseId);
    
    return {
      courseId,
      courseName: course ? course.course.name : 'Curso no encontrado',
      classmates,
    };
  }
} 