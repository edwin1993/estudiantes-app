import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { IStudentRepository } from '../../domain/repositories/student-repository.interface';
import { UpdateStudentDto, StudentResponseDto } from '../dto/student.dto';
import { STUDENT_REPOSITORY } from '../../domain/repositories/repository.tokens';

@Injectable()
export class UpdateStudentUseCase {
  constructor(
    @Inject(STUDENT_REPOSITORY)
    private readonly studentRepository: IStudentRepository,
  ) {}

  async execute(id: string, updateStudentDto: UpdateStudentDto): Promise<StudentResponseDto> {
    const existingStudent = await this.studentRepository.findById(id);
    if (!existingStudent) {
      throw new NotFoundException('Estudiante no encontrado.');
    }

    // Si se está actualizando el email, verificar que no exista otro estudiante con ese email
    if (updateStudentDto.email && updateStudentDto.email !== existingStudent.email) {
      const studentWithEmail = await this.studentRepository.findByEmail(updateStudentDto.email);
      if (studentWithEmail) {
        throw new BadRequestException('Ya existe un estudiante con este email.');
      }
    }

    const updatedStudent = await this.studentRepository.update(id, updateStudentDto);
    if (!updatedStudent) {
      throw new NotFoundException('Error al actualizar el estudiante.');
    }
    return this.mapToResponseDto(updatedStudent);
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