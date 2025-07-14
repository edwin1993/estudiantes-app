import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsDateString } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({ description: 'Nombre del estudiante' })
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'Apellido del estudiante' })
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'Email del estudiante' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Teléfono del estudiante' })
  @IsString()
  phone: string;

  @ApiProperty({ description: 'Dirección del estudiante' })
  @IsString()
  address: string;

  @ApiProperty({ description: 'Ciudad del estudiante' })
  @IsString()
  city: string;

  @ApiProperty({ description: 'Estado del estudiante' })
  @IsString()
  state: string;

  @ApiProperty({ description: 'Código postal del estudiante' })
  @IsString()
  zipCode: string;

  @ApiProperty({ description: 'Fecha de nacimiento del estudiante' })
  @IsDateString()
  dateOfBirth: string;

  @ApiProperty({ description: 'Nacionalidad del estudiante' })
  @IsString()
  nationality: string;

  @ApiProperty({ description: 'Número de pasaporte del estudiante' })
  @IsString()
  passportNumber: string;
} 