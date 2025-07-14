import { ApiProperty } from '@nestjs/swagger';

export class StudentFinancialSummaryDto {
  @ApiProperty({ description: 'ID del estudiante' })
  student_id: string;

  @ApiProperty({ description: 'Nombre del estudiante' })
  firstName: string;

  @ApiProperty({ description: 'Apellido del estudiante' })
  lastName: string;

  @ApiProperty({ description: 'Email del estudiante' })
  email: string;

  @ApiProperty({ description: 'Total de cursos inscritos' })
  total_courses: number;

  @ApiProperty({ description: 'Total de créditos' })
  total_credits: number;

  @ApiProperty({ description: 'Precio total en USD' })
  total_price_usd: number;

  @ApiProperty({ description: 'Precio total en EUR' })
  total_price_eur: number;

  @ApiProperty({ description: 'Precio promedio por crédito' })
  average_credit_price: number;

  @ApiProperty({ description: 'Fecha de última inscripción' })
  last_enrollment_date: Date;

  @ApiProperty({ description: 'Fecha de primera inscripción' })
  first_enrollment_date: Date;
} 