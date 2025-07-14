import { Enrollment } from '../entities/enrollment.entity';
import { CreateEnrollmentDto } from '../../application/dto/enrollment.dto';

export interface IEnrollmentRepository {
  create(createEnrollmentDto: CreateEnrollmentDto): Promise<Enrollment>;
  getStudentEnrollmentDetails(studentId: string): Promise<any[]>;
  getClassmatesByCourse(courseId: string, studentId: string): Promise<any[]>;
  cancelEnrollment(enrollmentId: string): Promise<void>;
} 