import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IStudentRepository } from '../../domain/repositories/student-repository.interface';
import { StudentFinancialSummaryDto } from '../dto/student-financial-summary.dto';
import { STUDENT_REPOSITORY } from '../../domain/repositories/repository.tokens';

@Injectable()
export class GetStudentFinancialSummaryUseCase {
  constructor(
    @Inject(STUDENT_REPOSITORY)
    private readonly studentRepository: IStudentRepository,
  ) {}

  async execute(studentId: string): Promise<StudentFinancialSummaryDto> {
    // Verificar que el estudiante existe
    const student = await this.studentRepository.findById(studentId);
    if (!student) {
      throw new NotFoundException('Estudiante no encontrado.');
    }

    // Obtener el resumen financiero usando el procedimiento almacenado
    const financialSummary = await this.studentRepository.getStudentFinancialSummary(studentId);
    
    if (!financialSummary) {
      throw new NotFoundException('No se pudo obtener el resumen financiero del estudiante.');
    }

    return financialSummary;
  }
} 