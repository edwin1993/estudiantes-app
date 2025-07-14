import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IStudentRepository } from '../../domain/repositories/student-repository.interface';
import { IEnrollmentRepository } from '../../domain/repositories/enrollment-repository.interface';
import { IExchangeRateService } from '../../domain/services/exchange-rate.interface';
import { StudentResponseDto } from '../dto/student.dto';
import { StudentEnrollmentDetailDto } from '../dto/enrollment.dto';
import { STUDENT_REPOSITORY, ENROLLMENT_REPOSITORY, EXCHANGE_RATE_SERVICE } from '../../domain/repositories/repository.tokens';

@Injectable()
export class GetStudentDetailWithEnrollmentsUseCase {
  constructor(
    @Inject(STUDENT_REPOSITORY)
    private readonly studentRepository: IStudentRepository,
    @Inject(ENROLLMENT_REPOSITORY)
    private readonly enrollmentRepository: IEnrollmentRepository,
    @Inject(EXCHANGE_RATE_SERVICE)
    private readonly exchangeRateService: IExchangeRateService,
  ) {}

  async execute(studentId: string) {
    const student = await this.studentRepository.findById(studentId);
    if (!student) {
      throw new NotFoundException('Estudiante no encontrado.');
    }

    const enrollments = await this.getStudentEnrollments(studentId);
    const totalCredits = enrollments.reduce((sum, enrollment) => sum + enrollment.credits, 0);
    const totalPriceUSD = enrollments.reduce((sum, enrollment) => sum + enrollment.totalPriceUSD, 0);
    const totalPriceEUR = enrollments.reduce((sum, enrollment) => sum + enrollment.totalPriceEUR, 0);

    return {
      student: this.mapToResponseDto(student),
      enrollments,
      summary: {
        totalCourses: enrollments.length,
        totalCredits,
        totalPriceUSD,
        totalPriceEUR,
      },
    };
  }

  private async getStudentEnrollments(studentId: string): Promise<StudentEnrollmentDetailDto[]> {
    const enrollments = await this.enrollmentRepository.getStudentEnrollmentDetails(studentId);
    const exchangeRate = await this.exchangeRateService.getCurrentExchangeRate();

    return enrollments.map(enrollment => ({
      enrollmentId: enrollment.id,
      courseName: enrollment.course.name,
      courseDescription: enrollment.course.description,
      credits: enrollment.course.credits,
      totalPriceUSD: enrollment.totalPriceUSD,
      totalPriceEUR: enrollment.totalPriceUSD * exchangeRate,
      professorName: `${enrollment.course.professor.firstName} ${enrollment.course.professor.lastName}`,
      enrollmentDate: enrollment.enrollmentDate,
      status: enrollment.status,
    }));
  }

  private mapToResponseDto(student: any): StudentResponseDto {
    return {
      id: student.id,
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      phone: student.phone,
      address: student.address,
      city: student.city,
      state: student.state,
      zipCode: student.zipCode,
      dateOfBirth: student.dateOfBirth,
      nationality: student.nationality,
      passportNumber: student.passportNumber,
      isActive: student.isActive,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
    };
  }
} 