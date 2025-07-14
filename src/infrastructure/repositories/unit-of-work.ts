import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { IUnitOfWork } from '../../domain/repositories/unit-of-work.interface';
import { IStudentRepository } from '../../domain/repositories/student-repository.interface';
import { IEnrollmentRepository } from '../../domain/repositories/enrollment-repository.interface';
import { StudentRepository } from './student.repository';
import { EnrollmentRepository } from './enrollment.repository';

@Injectable()
export class UnitOfWork implements IUnitOfWork {
  private queryRunner: QueryRunner;
  private _studentRepository: IStudentRepository;
  private _enrollmentRepository: IEnrollmentRepository;

  constructor(private readonly dataSource: DataSource) {}

  get studentRepository(): IStudentRepository {
    if (!this._studentRepository) {
      this._studentRepository = new StudentRepository(
        this.queryRunner.manager.getRepository('Student')
      );
    }
    return this._studentRepository;
  }

  get enrollmentRepository(): IEnrollmentRepository {
    if (!this._enrollmentRepository) {
      this._enrollmentRepository = new EnrollmentRepository(
        this.queryRunner.manager.getRepository('Enrollment'),
        this.queryRunner.manager.getRepository('Course')
      );
    }
    return this._enrollmentRepository;
  }

  async beginTransaction(): Promise<void> {
    this.queryRunner = this.dataSource.createQueryRunner();
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();
  }

  async commit(): Promise<void> {
    if (this.queryRunner) {
      await this.queryRunner.commitTransaction();
    }
  }

  async rollback(): Promise<void> {
    if (this.queryRunner) {
      await this.queryRunner.rollbackTransaction();
    }
  }

  async release(): Promise<void> {
    if (this.queryRunner) {
      await this.queryRunner.release();
    }
  }
} 