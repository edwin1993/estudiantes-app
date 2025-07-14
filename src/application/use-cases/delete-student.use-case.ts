import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IStudentRepository } from '../../domain/repositories/student-repository.interface';
import { STUDENT_REPOSITORY } from '../../domain/repositories/repository.tokens';

@Injectable()
export class DeleteStudentUseCase {
  constructor(
    @Inject(STUDENT_REPOSITORY)
    private readonly studentRepository: IStudentRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const student = await this.studentRepository.findById(id);
    if (!student) {
      throw new NotFoundException('Estudiante no encontrado.');
    }
    await this.studentRepository.delete(id);
  }
} 