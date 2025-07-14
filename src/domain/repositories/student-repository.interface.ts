import { Student } from '../entities/student.entity';
import { CreateStudentDto, UpdateStudentDto } from '../../application/dto/student.dto';
import { StudentFinancialSummaryDto } from '../../application/dto/student-financial-summary.dto';

export interface IStudentRepository {
  create(createStudentDto: CreateStudentDto): Promise<Student>;
  findAll(): Promise<Student[]>;
  findById(id: string): Promise<Student | null>;
  findByEmail(email: string): Promise<Student | null>;
  update(id: string, updateStudentDto: UpdateStudentDto): Promise<Student | null>;
  delete(id: string): Promise<void>;
  getStudentFinancialSummary(studentId: string): Promise<StudentFinancialSummaryDto | null>;
} 