import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { IUnitOfWork } from '../../domain/repositories/unit-of-work.interface';
import { UNIT_OF_WORK } from '../../domain/repositories/repository.tokens';

export interface TransferStudentCourseDto {
  studentId: string;
  fromCourseId: string;
  toCourseId: string;
  transferDate: string;
}

@Injectable()
export class TransferStudentCourseUseCase {
  constructor(
    @Inject(UNIT_OF_WORK)
    private readonly unitOfWork: IUnitOfWork,
  ) {}

  async execute(transferDto: TransferStudentCourseDto) {
    try {
      // Iniciar transacción
      await this.unitOfWork.beginTransaction();

      // Verificar que el estudiante existe
      const student = await this.unitOfWork.studentRepository.findById(transferDto.studentId);
      if (!student) {
        await this.unitOfWork.rollback();
        throw new NotFoundException('Estudiante no encontrado.');
      }

      // Verificar que el estudiante está inscrito en el curso de origen
      const enrollments = await this.unitOfWork.enrollmentRepository.getStudentEnrollmentDetails(transferDto.studentId);
      const currentEnrollment = enrollments.find(e => e.course.id === transferDto.fromCourseId);
      
      if (!currentEnrollment) {
        await this.unitOfWork.rollback();
        throw new BadRequestException('El estudiante no está inscrito en el curso de origen.');
      }

      // Verificar que no esté ya inscrito en el curso de destino
      const existingEnrollment = enrollments.find(e => e.course.id === transferDto.toCourseId);
      if (existingEnrollment) {
        await this.unitOfWork.rollback();
        throw new BadRequestException('El estudiante ya está inscrito en el curso de destino.');
      }

      // Cancelar inscripción actual
      await this.unitOfWork.enrollmentRepository.cancelEnrollment(currentEnrollment.id);

      // Crear nueva inscripción
      const newEnrollment = await this.unitOfWork.enrollmentRepository.create({
        studentId: transferDto.studentId,
        courseId: transferDto.toCourseId,
        enrollmentDate: transferDto.transferDate,
      });

      // Confirmar transacción
      await this.unitOfWork.commit();

      return {
        message: 'Estudiante transferido exitosamente',
        previousCourse: currentEnrollment.course.name,
        newCourse: newEnrollment.course?.name || 'Curso no encontrado',
        transferDate: transferDto.transferDate,
      };
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