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
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';

@ApiTags('Cursos')
@Controller('courses')
export class CourseController {
  constructor(
    private readonly studentApplicationService: StudentApplicationService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo curso' })
  @ApiResponse({
    status: 201,
    description: 'Curso creado exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  async createCourse(@Body() createCourseDto: CreateCourseDto) {
    return await this.studentApplicationService.createCourse(createCourseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los cursos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de cursos obtenida exitosamente',
  })
  async getAllCourses() {
    return await this.studentApplicationService.getAllCourses();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un curso por ID' })
  @ApiResponse({
    status: 200,
    description: 'Curso encontrado',
  })
  @ApiResponse({
    status: 404,
    description: 'Curso no encontrado',
  })
  async getCourseById(@Param('id') id: string) {
    return await this.studentApplicationService.getCourseById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un curso' })
  @ApiResponse({
    status: 200,
    description: 'Curso actualizado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Curso no encontrado',
  })
  async updateCourse(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return await this.studentApplicationService.updateCourse(
      id,
      updateCourseDto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un curso (soft delete)' })
  @ApiResponse({
    status: 204,
    description: 'Curso eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Curso no encontrado',
  })
  async deleteCourse(@Param('id') id: string) {
    await this.studentApplicationService.deleteCourse(id);
  }
} 