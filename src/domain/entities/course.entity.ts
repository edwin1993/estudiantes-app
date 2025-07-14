import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Professor } from './professor.entity';
import { Enrollment } from './enrollment.entity';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 500 })
  description: string;

  @Column({ default: 3 })
  credits: number;

  @Column({ default: 150 })
  creditPriceUSD: number;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  professorId: string;

  @ManyToOne(() => Professor, professor => professor.courses)
  @JoinColumn({ name: 'professorId' })
  professor: Professor;

  @OneToMany(() => Enrollment, enrollment => enrollment.course)
  enrollments: Enrollment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 