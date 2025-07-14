import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IStudentRepository } from '../../domain/repositories/student-repository.interface';
import { IEnrollmentRepository } from '../../domain/repositories/enrollment-repository.interface';
import { IExchangeRateService } from '../../domain/services/exchange-rate.interface';
import { StudentEnrollmentDetailDto } from '../dto/enrollment.dto';
import { STUDENT_REPOSITORY, ENROLLMENT_REPOSITORY, EXCHANGE_RATE_SERVICE } from '../../domain/repositories/repository.tokens';

@Injectable()
export class GetStudentEnrollmentsUseCase {
  constructor(
    @Inject(STUDENT_REPOSITORY)
    private readonly studentRepository: IStudentRepository,
    @Inject(ENROLLMENT_REPOSITORY)
    private readonly enrollmentRepository: IEnrollmentRepository,
    @Inject(EXCHANGE_RATE_SERVICE)
    private readonly exchangeRateService: IExchangeRateService,
  ) {}

  async execute(studentId: string): Promise<StudentEnrollmentDetailDto[]> {
    const student = await this.studentRepository.findById(studentId);
    if (!student) {
      throw new NotFoundException('Estudiante no encontrado.');
    }

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
} 