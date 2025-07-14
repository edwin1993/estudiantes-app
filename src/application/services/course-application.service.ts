import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../../domain/entities/course.entity';
import { Professor } from '../../domain/entities/professor.entity';

@Injectable()
export class CourseApplicationService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Professor)
    private readonly professorRepository: Repository<Professor>,
  ) {}

  async getAllCourses() {
    return await this.courseRepository.find({
      where: { isActive: true },
      relations: ['professor'],
      order: { name: 'ASC' },
    });
  }

  async getAllProfessors() {
    return await this.professorRepository.find({
      where: { isActive: true },
      relations: ['courses'],
      order: { firstName: 'ASC' },
    });
  }

  async getCoursesByProfessor(professorId: string) {
    return await this.courseRepository.find({
      where: { professorId, isActive: true },
      relations: ['professor'],
      order: { name: 'ASC' },
    });
  }

  async getCourseById(id: string) {
    return await this.courseRepository.findOne({
      where: { id, isActive: true },
      relations: ['professor'],
    });
  }
} 