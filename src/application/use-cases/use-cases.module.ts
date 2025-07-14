import { Module } from '@nestjs/common';
import { CreateStudentUseCase } from './create-student.use-case';
import { GetAllStudentsUseCase } from './get-all-students.use-case';
import { GetStudentByIdUseCase } from './get-student-by-id.use-case';
import { UpdateStudentUseCase } from './update-student.use-case';
import { DeleteStudentUseCase } from './delete-student.use-case';
import { EnrollStudentUseCase } from './enroll-student.use-case';
import { GetStudentEnrollmentsUseCase } from './get-student-enrollments.use-case';
import { GetClassmatesByCourseUseCase } from './get-classmates-by-course.use-case';
import { GetStudentDetailWithEnrollmentsUseCase } from './get-student-detail-with-enrollments.use-case';
import { GetStudentFinancialSummaryUseCase } from './get-student-financial-summary.use-case';
import { TransferStudentCourseUseCase } from './transfer-student-course.use-case';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule],
  providers: [
    CreateStudentUseCase,
    GetAllStudentsUseCase,
    GetStudentByIdUseCase,
    UpdateStudentUseCase,
    DeleteStudentUseCase,
    EnrollStudentUseCase,
    GetStudentEnrollmentsUseCase,
    GetClassmatesByCourseUseCase,
    GetStudentDetailWithEnrollmentsUseCase,
    GetStudentFinancialSummaryUseCase,
    TransferStudentCourseUseCase,
  ],
  exports: [
    CreateStudentUseCase,
    GetAllStudentsUseCase,
    GetStudentByIdUseCase,
    UpdateStudentUseCase,
    DeleteStudentUseCase,
    EnrollStudentUseCase,
    GetStudentEnrollmentsUseCase,
    GetClassmatesByCourseUseCase,
    GetStudentDetailWithEnrollmentsUseCase,
    GetStudentFinancialSummaryUseCase,
    TransferStudentCourseUseCase,
  ],
})
export class UseCasesModule {} 