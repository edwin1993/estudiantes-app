import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

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