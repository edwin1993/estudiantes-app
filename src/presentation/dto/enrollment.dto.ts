import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsDateString } from 'class-validator';

export class EnrollmentDto {
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