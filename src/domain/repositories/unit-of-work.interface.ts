import { IStudentRepository } from './student-repository.interface';
import { IEnrollmentRepository } from './enrollment-repository.interface';

export interface IUnitOfWork {
  studentRepository: IStudentRepository;
  enrollmentRepository: IEnrollmentRepository;
  
  beginTransaction(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
  release(): Promise<void>;
} 