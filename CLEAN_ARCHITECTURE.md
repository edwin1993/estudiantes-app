# Clean Architecture - Estudiantes App

## Estructura del Proyecto

Este proyecto ha sido reorganizado siguiendo los principios de Clean Architecture (Arquitectura Limpia) de Robert C. Martin. La nueva estructura separa las responsabilidades en capas bien definidas:

```
src/
├── domain/                    # Capa de Dominio
│   ├── entities/             # Entidades de negocio
│   ├── repositories/         # Interfaces de repositorios
│   └── services/             # Interfaces de servicios de dominio
├── application/              # Capa de Aplicación
│   ├── use-cases/           # Casos de uso específicos
│   ├── services/            # Servicios de aplicación
│   └── dto/                 # Objetos de transferencia de datos
├── infrastructure/           # Capa de Infraestructura
│   ├── repositories/        # Implementaciones de repositorios
│   ├── services/            # Servicios externos
│   └── config/              # Configuraciones
└── presentation/            # Capa de Presentación
    ├── controllers/         # Controladores HTTP
    └── dto/                 # DTOs de presentación
```

## Capas de la Arquitectura

### 1. Domain Layer (Capa de Dominio)
- **Responsabilidad**: Contiene las reglas de negocio centrales y las entidades del dominio
- **Componentes**:
  - `entities/`: Entidades de negocio (Student, Course, Enrollment, Professor)
  - `repositories/`: Interfaces que definen contratos para acceso a datos
  - `services/`: Interfaces de servicios de dominio

### 2. Application Layer (Capa de Aplicación)
- **Responsabilidad**: Orquesta los casos de uso y coordina entre el dominio y la infraestructura
- **Componentes**:
  - `use-cases/`: Casos de uso específicos (CreateStudent, GetAllStudents, etc.)
  - `services/`: Servicios que orquestan múltiples casos de uso
  - `dto/`: Objetos de transferencia de datos para la aplicación

### 3. Infrastructure Layer (Capa de Infraestructura)
- **Responsabilidad**: Implementa el acceso a datos y servicios externos
- **Componentes**:
  - `repositories/`: Implementaciones concretas de los repositorios
  - `services/`: Servicios externos (ExchangeRateService)
  - `config/`: Configuraciones de la aplicación

### 4. Presentation Layer (Capa de Presentación)
- **Responsabilidad**: Maneja la presentación y la comunicación HTTP
- **Componentes**:
  - `controllers/`: Controladores REST API
  - `dto/`: DTOs específicos para la presentación

## Principios Aplicados

### 1. Inversión de Dependencias
- Las capas internas (Domain, Application) no dependen de las externas
- Las dependencias apuntan hacia adentro
- Se usan interfaces para desacoplar implementaciones

### 2. Separación de Responsabilidades
- Cada capa tiene una responsabilidad específica
- Los casos de uso están separados y son reutilizables
- La lógica de negocio está aislada en el dominio

### 3. Independencia de Frameworks
- El dominio no depende de NestJS ni TypeORM
- Las entidades son clases puras de JavaScript/TypeScript
- Los casos de uso son independientes del framework

## Casos de Uso Implementados

1. **CreateStudentUseCase**: Crear un nuevo estudiante
2. **GetAllStudentsUseCase**: Obtener todos los estudiantes
3. **GetStudentByIdUseCase**: Obtener un estudiante por ID
4. **UpdateStudentUseCase**: Actualizar un estudiante
5. **DeleteStudentUseCase**: Eliminar un estudiante
6. **EnrollStudentUseCase**: Inscribir un estudiante a un curso
7. **GetStudentEnrollmentsUseCase**: Obtener inscripciones de un estudiante
8. **GetClassmatesByCourseUseCase**: Obtener compañeros de clase
9. **GetStudentDetailWithEnrollmentsUseCase**: Obtener detalle completo del estudiante

## Beneficios de la Nueva Arquitectura

1. **Mantenibilidad**: Código más fácil de mantener y modificar
2. **Testabilidad**: Cada capa puede ser testeada independientemente
3. **Escalabilidad**: Fácil agregar nuevas funcionalidades
4. **Flexibilidad**: Cambios en una capa no afectan otras
5. **Claridad**: Responsabilidades bien definidas y separadas

## Migración Realizada

- ✅ Reorganización de carpetas según Clean Architecture
- ✅ Creación de interfaces de dominio
- ✅ Separación de casos de uso
- ✅ Implementación de inversión de dependencias
- ✅ Actualización de controladores para usar servicios de aplicación
- ✅ Configuración de módulos NestJS
- ✅ Eliminación de carpetas obsoletas

## Próximos Pasos Recomendados

1. Implementar tests unitarios para cada caso de uso
2. Agregar validaciones de dominio
3. Implementar manejo de errores centralizado
4. Crear documentación de API con Swagger
5. Implementar logging y monitoreo 