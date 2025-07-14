import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({
    description: 'Nombre del curso',
    example: 'Matemáticas Avanzadas',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Descripción del curso',
    example: 'Curso avanzado de matemáticas para estudiantes universitarios',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Número de créditos del curso',
    example: 3,
  })
  @IsNumber()
  @Min(1)
  credits: number;

  @ApiProperty({
    description: 'Precio por crédito en USD',
    example: 150,
  })
  @IsNumber()
  @Min(0)
  creditPriceUSD: number;

  @ApiProperty({
    description: 'ID del profesor que dicta el curso',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsUUID()
  professorId: string;
}

export class UpdateCourseDto {
  @ApiProperty({
    description: 'Nombre del curso',
    example: 'Matemáticas Avanzadas',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Descripción del curso',
    example: 'Curso avanzado de matemáticas para estudiantes universitarios',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Número de créditos del curso',
    example: 3,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  credits?: number;

  @ApiProperty({
    description: 'Precio por crédito en USD',
    example: 150,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  creditPriceUSD?: number;

  @ApiProperty({
    description: 'ID del profesor que dicta el curso',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  professorId?: string;
}

export class CourseResponseDto {
  @ApiProperty({
    description: 'ID del curso',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Nombre del curso',
    example: 'Matemáticas Avanzadas',
  })
  name: string;

  @ApiProperty({
    description: 'Descripción del curso',
    example: 'Curso avanzado de matemáticas para estudiantes universitarios',
  })
  description: string;

  @ApiProperty({
    description: 'Número de créditos del curso',
    example: 3,
  })
  credits: number;

  @ApiProperty({
    description: 'Precio por crédito en USD',
    example: 150,
  })
  creditPriceUSD: number;

  @ApiProperty({
    description: 'ID del profesor que dicta el curso',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  professorId: string;

  @ApiProperty({
    description: 'Indica si el curso está activo',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Fecha de creación',
    example: '2024-01-10T09:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha de actualización',
    example: '2024-01-10T09:00:00Z',
  })
  updatedAt: Date;
} 