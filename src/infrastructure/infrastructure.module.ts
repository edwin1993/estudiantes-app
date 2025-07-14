import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../domain/entities/student.entity';
import { Professor } from '../domain/entities/professor.entity';
import { Course } from '../domain/entities/course.entity';
import { Enrollment } from '../domain/entities/enrollment.entity';
import { StudentRepository } from './repositories/student.repository';
import { EnrollmentRepository } from './repositories/enrollment.repository';
import { UnitOfWork } from './repositories/unit-of-work';
import { ExchangeRateService } from './services/exchange-rate.service';
import { CourseApplicationService } from '../application/services/course-application.service';
import { STUDENT_REPOSITORY, ENROLLMENT_REPOSITORY, EXCHANGE_RATE_SERVICE, UNIT_OF_WORK } from '../domain/repositories/repository.tokens';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, Professor, Course, Enrollment]),
  ],
  providers: [
    {
      provide: STUDENT_REPOSITORY,
      useClass: StudentRepository,
    },
    {
      provide: ENROLLMENT_REPOSITORY,
      useClass: EnrollmentRepository,
    },
    {
      provide: EXCHANGE_RATE_SERVICE,
      useClass: ExchangeRateService,
    },
    {
      provide: UNIT_OF_WORK,
      useClass: UnitOfWork,
    },
    CourseApplicationService,
  ],
  exports: [
    STUDENT_REPOSITORY,
    ENROLLMENT_REPOSITORY,
    EXCHANGE_RATE_SERVICE,
    UNIT_OF_WORK,
    CourseApplicationService,
  ],
})
export class InfrastructureModule {} 