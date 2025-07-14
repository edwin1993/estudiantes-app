import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Student } from '../../domain/entities/student.entity';
import { Professor } from '../../domain/entities/professor.entity';
import { Course } from '../../domain/entities/course.entity';
import { Enrollment } from '../../domain/entities/enrollment.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '12345',
  database: process.env.DB_DATABASE || 'estudiantes_app',
  entities: [Student, Professor, Course, Enrollment],
  synchronize: process.env.NODE_ENV !== 'production', // Solo en desarrollo
  logging: process.env.NODE_ENV !== 'production',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
}; 