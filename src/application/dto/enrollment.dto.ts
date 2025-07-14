import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsDateString } from 'class-validator';

export class CreateEnrollmentDto {
  @ApiProperty({ description: 'ID del estudiante' })
  @IsUUID()
  studentId: string;

  @ApiProperty({ description: 'ID del curso' })
  @IsUUID()
  courseId: string;

  @ApiProperty({ description: 'Fecha de inscripción' })
  @IsDateString()
  enrollmentDate: string;
}

export class EnrollmentResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  studentId: string;

  @ApiProperty()
  courseId: string;

  @ApiProperty()
  enrollmentDate: Date;

  @ApiProperty()
  status: string;

  @ApiProperty()
  totalPriceUSD: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class StudentEnrollmentDetailDto {
  @ApiProperty()
  enrollmentId: string;

  @ApiProperty()
  courseName: string;

  @ApiProperty()
  courseDescription: string;

  @ApiProperty()
  credits: number;

  @ApiProperty()
  totalPriceUSD: number;

  @ApiProperty()
  totalPriceEUR: number;

  @ApiProperty()
  professorName: string;

  @ApiProperty()
  enrollmentDate: Date;

  @ApiProperty()
  status: string;
}

export class CourseClassmatesDto {
  @ApiProperty()
  courseId: string;

  @ApiProperty()
  courseName: string;

  @ApiProperty()
  classmates: string[]; // Solo nombres de estudiantes
} 