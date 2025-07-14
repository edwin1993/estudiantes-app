import { Injectable } from '@nestjs/common';
import { CreateStudentDto, UpdateStudentDto, StudentResponseDto } from '../dto/student.dto';
import { CreateEnrollmentDto, StudentEnrollmentDetailDto, CourseClassmatesDto } from '../dto/enrollment.dto';
import { StudentFinancialSummaryDto } from '../dto/student-financial-summary.dto';
import { CreateCourseDto, UpdateCourseDto, CourseResponseDto } from '../dto/course.dto';
import { CreateStudentUseCase } from '../use-cases/create-student.use-case';
import { GetAllStudentsUseCase } from '../use-cases/get-all-students.use-case';
import { GetStudentByIdUseCase } from '../use-cases/get-student-by-id.use-case';
import { UpdateStudentUseCase } from '../use-cases/update-student.use-case';
import { DeleteStudentUseCase } from '../use-cases/delete-student.use-case';
import { EnrollStudentUseCase } from '../use-cases/enroll-student.use-case';
import { GetStudentEnrollmentsUseCase } from '../use-cases/get-student-enrollments.use-case';
import { GetClassmatesByCourseUseCase } from '../use-cases/get-classmates-by-course.use-case';
import { GetStudentDetailWithEnrollmentsUseCase } from '../use-cases/get-student-detail-with-enrollments.use-case';
import { GetStudentFinancialSummaryUseCase } from '../use-cases/get-student-financial-summary.use-case';

@Injectable()
export class StudentApplicationService {
  constructor(
    private readonly createStudentUseCase: CreateStudentUseCase,
    private readonly getAllStudentsUseCase: GetAllStudentsUseCase,
    private readonly getStudentByIdUseCase: GetStudentByIdUseCase,
    private readonly updateStudentUseCase: UpdateStudentUseCase,
    private readonly deleteStudentUseCase: DeleteStudentUseCase,
    private readonly enrollStudentUseCase: EnrollStudentUseCase,
    private readonly getStudentEnrollmentsUseCase: GetStudentEnrollmentsUseCase,
    private readonly getClassmatesByCourseUseCase: GetClassmatesByCourseUseCase,
    private readonly getStudentDetailWithEnrollmentsUseCase: GetStudentDetailWithEnrollmentsUseCase,
    private readonly getStudentFinancialSummaryUseCase: GetStudentFinancialSummaryUseCase,
  ) {}

  async createStudent(createStudentDto: CreateStudentDto): Promise<StudentResponseDto> {
    return this.createStudentUseCase.execute(createStudentDto);
  }

  async getAllStudents(): Promise<StudentResponseDto[]> {
    return this.getAllStudentsUseCase.execute();
  }

  async getStudentById(id: string): Promise<StudentResponseDto> {
    return this.getStudentByIdUseCase.execute(id);
  }

  async updateStudent(id: string, updateStudentDto: UpdateStudentDto): Promise<StudentResponseDto> {
    return this.updateStudentUseCase.execute(id, updateStudentDto);
  }

  async deleteStudent(id: string): Promise<void> {
    return this.deleteStudentUseCase.execute(id);
  }

  async enrollStudent(createEnrollmentDto: CreateEnrollmentDto) {
    return this.enrollStudentUseCase.execute(createEnrollmentDto);
  }

  async getStudentEnrollments(studentId: string): Promise<StudentEnrollmentDetailDto[]> {
    return this.getStudentEnrollmentsUseCase.execute(studentId);
  }

  async getClassmatesByCourse(courseId: string, studentId: string): Promise<CourseClassmatesDto> {
    return this.getClassmatesByCourseUseCase.execute(courseId, studentId);
  }

  async getStudentDetailWithEnrollments(studentId: string) {
    return this.getStudentDetailWithEnrollmentsUseCase.execute(studentId);
  }

  async getStudentFinancialSummary(studentId: string): Promise<StudentFinancialSummaryDto> {
    return this.getStudentFinancialSummaryUseCase.execute(studentId);
  }

  // Métodos para cursos (placeholder - necesitarían casos de uso correspondientes)
  async createCourse(createCourseDto: CreateCourseDto): Promise<CourseResponseDto> {
    throw new Error('Método no implementado - requiere caso de uso CreateCourseUseCase');
  }

  async getAllCourses(): Promise<CourseResponseDto[]> {
    throw new Error('Método no implementado - requiere caso de uso GetAllCoursesUseCase');
  }

  async getCourseById(id: string): Promise<CourseResponseDto> {
    throw new Error('Método no implementado - requiere caso de uso GetCourseByIdUseCase');
  }

  async updateCourse(id: string, updateCourseDto: UpdateCourseDto): Promise<CourseResponseDto> {
    throw new Error('Método no implementado - requiere caso de uso UpdateCourseUseCase');
  }

  async deleteCourse(id: string): Promise<void> {
    throw new Error('Método no implementado - requiere caso de uso DeleteCourseUseCase');
  }
} 