import { ApiProperty } from '@nestjs/swagger';

export class StudentFinancialSummaryDto {
  @ApiProperty({
    description: 'ID del estudiante',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  student_id: string;

  @ApiProperty({
    description: 'Nombre del estudiante',
    example: 'John',
  })
  firstName: string;

  @ApiProperty({
    description: 'Apellido del estudiante',
    example: 'Doe',
  })
  lastName: string;

  @ApiProperty({
    description: 'Email del estudiante',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Total de cursos inscritos',
    example: 3,
  })
  total_courses: number;

  @ApiProperty({
    description: 'Total de créditos',
    example: 9,
  })
  total_credits: number;

  @ApiProperty({
    description: 'Precio total en USD',
    example: 1350.00,
  })
  total_price_usd: number;

  @ApiProperty({
    description: 'Precio total en EUR (convertido con tasa 0.85)',
    example: 1147.50,
  })
  total_price_eur: number;

  @ApiProperty({
    description: 'Precio promedio por crédito en USD',
    example: 150.00,
  })
  average_credit_price: number;

  @ApiProperty({
    description: 'Fecha de la última inscripción',
    example: '2024-01-15T10:30:00Z',
  })
  last_enrollment_date: Date;

  @ApiProperty({
    description: 'Fecha de la primera inscripción',
    example: '2024-01-10T09:00:00Z',
  })
  first_enrollment_date: Date;
} 