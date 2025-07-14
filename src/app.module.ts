import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './domain/entities/student.entity';
import { Professor } from './domain/entities/professor.entity';
import { Course } from './domain/entities/course.entity';
import { Enrollment } from './domain/entities/enrollment.entity';
import { StudentController } from './presentation/controllers/student.controller';
import { CourseController } from './presentation/controllers/course.controller';
import { StudentApplicationService } from './application/services/student-application.service';
import { UseCasesModule } from './application/use-cases/use-cases.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { typeOrmConfig } from './infrastructure/config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    UseCasesModule,
    InfrastructureModule,
  ],
  controllers: [StudentController, CourseController],
  providers: [
    StudentApplicationService,
  ],
})
export class AppModule {}
