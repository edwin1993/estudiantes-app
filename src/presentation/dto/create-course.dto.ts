import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID, Min } from 'class-validator';

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