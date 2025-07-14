import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IUnitOfWork } from '../../domain/repositories/unit-of-work.interface';
import { CreateEnrollmentDto } from '../dto/enrollment.dto';
import { UNIT_OF_WORK } from '../../domain/repositories/repository.tokens';

@Injectable()
export class EnrollStudentUseCase {
  constructor(
    @Inject(UNIT_OF_WORK)
    // Inyecta el UnitOfWork para manejar la transacción
    private readonly unitOfWork: IUnitOfWork,
  ) {}

  async execute(createEnrollmentDto: CreateEnrollmentDto) {
    try {
      // Iniciar transacción
      await this.unitOfWork.beginTransaction();

      // Verificar que el estudiante existe
      const student = await this.unitOfWork.studentRepository.findById(createEnrollmentDto.studentId);
      if (!student) {
        await this.unitOfWork.rollback();
        throw new NotFoundException('Estudiante no encontrado.');
      }

      // Crear la inscripción
      const enrollment = await this.unitOfWork.enrollmentRepository.create(createEnrollmentDto);

      // Confirmar transacción
      await this.unitOfWork.commit();

      return enrollment;
    } catch (error) {
      // Revertir transacción en caso de error
      await this.unitOfWork.rollback();
      throw error;
    } finally {
      // Liberar recursos
      await this.unitOfWork.release();
    }
  }
} 