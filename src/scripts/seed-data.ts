import { DataSource } from 'typeorm';
import { Professor } from '../domain/entities/professor.entity';
import { Course } from '../domain/entities/course.entity';

export async function seedData(dataSource: DataSource) {
  const professorRepository = dataSource.getRepository(Professor);
  const courseRepository = dataSource.getRepository(Course);

  // Crear 5 profesores
  const professors = [
    {
      firstName: 'Dr. María',
      lastName: 'García',
      email: 'maria.garcia@universidad.es',
      phone: '+34 600 111 111',
      specialization: 'Matemáticas Avanzadas',
    },
    {
      firstName: 'Dr. Carlos',
      lastName: 'Rodríguez',
      email: 'carlos.rodriguez@universidad.es',
      phone: '+34 600 222 222',
      specialization: 'Física Cuántica',
    },
    {
      firstName: 'Dra. Ana',
      lastName: 'López',
      email: 'ana.lopez@universidad.es',
      phone: '+34 600 333 333',
      specialization: 'Literatura Española',
    },
    {
      firstName: 'Dr. Javier',
      lastName: 'Martínez',
      email: 'javier.martinez@universidad.es',
      phone: '+34 600 444 444',
      specialization: 'Historia del Arte',
    },
    {
      firstName: 'Dra. Isabel',
      lastName: 'Fernández',
      email: 'isabel.fernandez@universidad.es',
      phone: '+34 600 555 555',
      specialization: 'Biología Molecular',
    },
  ];

  const savedProfessors: Professor[] = [];
  for (const professorData of professors) {
    const professor = professorRepository.create(professorData);
    const savedProfessor = await professorRepository.save(professor);
    savedProfessors.push(savedProfessor);
  }

  // Crear 10 materias (2 por profesor)
  const courses = [
    {
      name: 'Cálculo Diferencial',
      description: 'Fundamentos del cálculo diferencial y sus aplicaciones',
      credits: 3,
      creditPriceUSD: 150,
      professorId: savedProfessors[0].id,
    },
    {
      name: 'Álgebra Lineal',
      description: 'Estudio de espacios vectoriales y transformaciones lineales',
      credits: 3,
      creditPriceUSD: 150,
      professorId: savedProfessors[0].id,
    },
    {
      name: 'Mecánica Clásica',
      description: 'Principios fundamentales de la mecánica newtoniana',
      credits: 3,
      creditPriceUSD: 150,
      professorId: savedProfessors[1].id,
    },
    {
      name: 'Termodinámica',
      description: 'Estudio de las leyes de la termodinámica',
      credits: 3,
      creditPriceUSD: 150,
      professorId: savedProfessors[1].id,
    },
    {
      name: 'Literatura del Siglo de Oro',
      description: 'Análisis de la literatura española del Siglo de Oro',
      credits: 3,
      creditPriceUSD: 150,
      professorId: savedProfessors[2].id,
    },
    {
      name: 'Poesía Contemporánea',
      description: 'Estudio de la poesía española contemporánea',
      credits: 3,
      creditPriceUSD: 150,
      professorId: savedProfessors[2].id,
    },
    {
      name: 'Arte Renacentista',
      description: 'Historia y análisis del arte del Renacimiento',
      credits: 3,
      creditPriceUSD: 150,
      professorId: savedProfessors[3].id,
    },
    {
      name: 'Arte Barroco',
      description: 'Estudio del arte barroco en Europa',
      credits: 3,
      creditPriceUSD: 150,
      professorId: savedProfessors[3].id,
    },
    {
      name: 'Genética Molecular',
      description: 'Fundamentos de la genética a nivel molecular',
      credits: 3,
      creditPriceUSD: 150,
      professorId: savedProfessors[4].id,
    },
    {
      name: 'Biología Celular',
      description: 'Estudio de la estructura y función de las células',
      credits: 3,
      creditPriceUSD: 150,
      professorId: savedProfessors[4].id,
    },
  ];

  for (const courseData of courses) {
    const course = courseRepository.create(courseData);
    await courseRepository.save(course);
  }

  console.log('✅ Datos iniciales creados exitosamente');
  console.log(`📚 ${professors.length} profesores creados`);
  console.log(`📖 ${courses.length} materias creadas`);
} 