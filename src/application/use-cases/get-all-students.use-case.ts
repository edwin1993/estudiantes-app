import { Injectable, Inject } from '@nestjs/common';
import { IStudentRepository } from '../../domain/repositories/student-repository.interface';
import { StudentResponseDto } from '../dto/student.dto';
import { STUDENT_REPOSITORY } from '../../domain/repositories/repository.tokens';

@Injectable()
export class GetAllStudentsUseCase {
  constructor(
    @Inject(STUDENT_REPOSITORY)
    private readonly studentRepository: IStudentRepository,
  ) {}

  async execute(): Promise<StudentResponseDto[]> {
    const students = await this.studentRepository.findAll();
    return students.map(student => this.mapToResponseDto(student));
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