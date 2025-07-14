import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsDateString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateStudentDto {
  @ApiProperty({ description: 'Nombre del estudiante', required: false })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ description: 'Apellido del estudiante', required: false })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ description: 'Email del estudiante', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'Teléfono del estudiante', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ description: 'Dirección del estudiante', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ description: 'Ciudad del estudiante', required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ description: 'Estado del estudiante', required: false })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({ description: 'Código postal del estudiante', required: false })
  @IsOptional()
  @IsString()
  zipCode?: string;

  @ApiProperty({ description: 'Fecha de nacimiento del estudiante', required: false })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @ApiProperty({ description: 'Nacionalidad del estudiante', required: false })
  @IsOptional()
  @IsString()
  nationality?: string;

  @ApiProperty({ description: 'Número de pasaporte del estudiante', required: false })
  @IsOptional()
  @IsString()
  passportNumber?: string;

  @ApiProperty({ description: 'Estado activo del estudiante', required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
} 