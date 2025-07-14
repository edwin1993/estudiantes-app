import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { IStudentRepository } from '../../domain/repositories/student-repository.interface';
import { CreateStudentDto, StudentResponseDto } from '../dto/student.dto';
import { STUDENT_REPOSITORY } from '../../domain/repositories/repository.tokens';

@Injectable()
export class CreateStudentUseCase {
  constructor(
    @Inject(STUDENT_REPOSITORY)
    private readonly studentRepository: IStudentRepository,
  ) {}

  async execute(createStudentDto: CreateStudentDto): Promise<StudentResponseDto> {
    // Verificar que el email no esté registrado
    const existingStudent = await this.studentRepository.findByEmail(createStudentDto.email);
    if (existingStudent) {
      throw new BadRequestException('Ya existe un estudiante con este email.');
    }

    const student = await this.studentRepository.create(createStudentDto);
    return this.mapToResponseDto(student);
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