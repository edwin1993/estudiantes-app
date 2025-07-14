import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Enrollment } from './enrollment.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ length: 200 })
  address: string;

  @Column({ length: 50 })
  city: string;

  @Column({ length: 50 })
  state: string;

  @Column({ length: 10 })
  zipCode: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column({ length: 20 })
  nationality: string;

  @Column({ length: 20 })
  passportNumber: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Enrollment, enrollment => enrollment.student)
  enrollments: Enrollment[];
} 