import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StudentApplicationService } from '../../application/services/student-application.service';
import { CreateStudentDto } from '../dto/create-student.dto';
import { UpdateStudentDto } from '../dto/update-student.dto';
import { EnrollmentDto } from '../dto/enrollment.dto';
import { StudentFinancialSummaryDto } from '../dto/student-financial-summary.dto';

@ApiTags('Estudiantes')
@Controller('students')
export class StudentController {
  constructor(
    private readonly studentApplicationService: StudentApplicationService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo estudiante' })
  @ApiResponse({
    status: 201,
    description: 'Estudiante creado exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  async createStudent(@Body() createStudentDto: CreateStudentDto) {
    return await this.studentApplicationService.createStudent(createStudentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los estudiantes' })
  @ApiResponse({
    status: 200,
    description: 'Lista de estudiantes obtenida exitosamente',
  })
  async getAllStudents() {
    return await this.studentApplicationService.getAllStudents();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un estudiante por ID' })
  @ApiResponse({
    status: 200,
    description: 'Estudiante encontrado',
  })
  @ApiResponse({
    status: 404,
    description: 'Estudiante no encontrado',
  })
  async getStudentById(@Param('id') id: string) {
    return await this.studentApplicationService.getStudentById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un estudiante' })
  @ApiResponse({
    status: 200,
    description: 'Estudiante actualizado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Estudiante no encontrado',
  })
  async updateStudent(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return await this.studentApplicationService.updateStudent(
      id,
      updateStudentDto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un estudiante (soft delete)' })
  @ApiResponse({
    status: 204,
    description: 'Estudiante eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Estudiante no encontrado',
  })
  async deleteStudent(@Param('id') id: string) {
    await this.studentApplicationService.deleteStudent(id);
  }

  @Post('enroll')
  @ApiOperation({ summary: 'Inscribir un estudiante a una materia' })
  @ApiResponse({
    status: 201,
    description: 'Inscripción realizada exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Error en la inscripción',
  })
  async enrollStudent(@Body() enrollmentDto: EnrollmentDto) {
    return await this.studentApplicationService.enrollStudent(enrollmentDto);
  }

  @Get(':id/enrollments')
  @ApiOperation({ summary: 'Obtener materias inscritas de un estudiante' })
  @ApiResponse({
    status: 200,
    description: 'Inscripciones obtenidas exitosamente',
  })
  async getStudentEnrollments(@Param('id') id: string) {
    return await this.studentApplicationService.getStudentEnrollments(id);
  }

  @Get(':studentId/classmates/:courseId')
  @ApiOperation({ summary: 'Obtener compañeros de clase de un estudiante' })
  @ApiResponse({
    status: 200,
    description: 'Compañeros de clase obtenidos exitosamente',
  })
  async getClassmates(
    @Param('studentId') studentId: string,
    @Param('courseId') courseId: string,
  ) {
    return await this.studentApplicationService.getClassmatesByCourse(
      courseId,
      studentId,
    );
  }

  @Get(':id/financial-summary')
  @ApiOperation({ summary: 'Obtener resumen financiero de un estudiante' })
  @ApiResponse({
    status: 200,
    description: 'Resumen financiero obtenido exitosamente',
    type: StudentFinancialSummaryDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Estudiante no encontrado',
  })
  async getStudentFinancialSummary(@Param('id') id: string) {
    return await this.studentApplicationService.getStudentFinancialSummary(id);
  }

  @Get(':id/detail')
  @ApiOperation({ summary: 'Obtener detalle completo de un estudiante' })
  @ApiResponse({
    status: 200,
    description: 'Detalle del estudiante obtenido exitosamente',
  })
  async getStudentDetail(@Param('id') id: string) {
    return await this.studentApplicationService.getStudentDetailWithEnrollments(id);
  }
} 