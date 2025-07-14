# 🎓 API de Gestión de Estudiantes - Universidad Española

Esta aplicación permite gestionar el registro de estudiantes estadounidenses en una universidad española, incluyendo inscripciones a materias, gestión de créditos y conversión de monedas.

## 🚀 Características

- ✅ **CRUD completo de estudiantes** con validación de datos
- ✅ **Sistema de inscripciones** con límite de 3 materias por estudiante
- ✅ **10 materias disponibles** con 3 créditos cada una ($150 USD por crédito)
- ✅ **5 profesores** que dictan 2 materias cada uno
- ✅ **Validación de profesores únicos** por estudiante
- ✅ **Listado de compañeros de clase** por materia
- ✅ **Conversión automática USD a EUR** usando API externa
- ✅ **Documentación completa** con Swagger
- ✅ **Base de datos MySQL** con TypeORM

## 📋 Requisitos Previos

- Node.js (v18 o superior)
- MySQL (v8.0 o superior)
- npm o yarn

## 🛠️ Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <tu-repositorio>
   cd estudiantes-app
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp env.example .env
   ```
   
   Editar el archivo `.env` con tus credenciales de MySQL:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=tu_password
   DB_DATABASE=estudiantes_app
   PORT=3000
   NODE_ENV=development
   ```

4. **Crear la base de datos**
   ```sql
   CREATE DATABASE estudiantes_app;
   ```

5. **Ejecutar la aplicación**
   ```bash
   npm run start:dev
   ```

## 📚 Endpoints Disponibles

### Estudiantes
- `POST /students` - Crear un nuevo estudiante
- `GET /students` - Obtener todos los estudiantes
- `GET /students/:id` - Obtener un estudiante por ID
- `PUT /students/:id` - Actualizar un estudiante
- `DELETE /students/:id` - Eliminar un estudiante (soft delete)

### Inscripciones
- `POST /students/enroll` - Inscribir un estudiante a una materia
- `GET /students/:id/enrollments` - Obtener materias inscritas de un estudiante
- `GET /students/:studentId/classmates/:courseId` - Obtener compañeros de clase
- `GET /students/:id/detail` - Obtener detalle completo con resumen financiero

## 🔧 Reglas de Negocio

### Inscripciones
- **Máximo 3 materias** por estudiante simultáneamente
- **No se puede repetir** la misma materia
- **No se puede tener** clases con el mismo profesor
- **Cada materia** equivale a 3 créditos
- **Cada crédito** cuesta $150 USD

### Profesores
- **5 profesores** disponibles
- **Cada profesor** dicta 2 materias
- **Validación** para evitar duplicación de profesores

### Conversión de Monedas
- **API externa**: https://api.frankfurter.app/latest
- **Conversión automática** USD → EUR
- **Tasa de cambio** actualizada en tiempo real

## 📊 Estructura de la Base de Datos

### Tablas Principales
- `students` - Información de estudiantes
- `professors` - Información de profesores
- `courses` - Materias disponibles
- `enrollments` - Inscripciones de estudiantes

### Relaciones
- Un estudiante puede tener múltiples inscripciones
- Un profesor puede dictar múltiples materias
- Una materia pertenece a un profesor
- Una inscripción conecta un estudiante con una materia

## 🧪 Ejemplos de Uso

### 1. Crear un Estudiante
```bash
curl -X POST http://localhost:3000/students \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@email.com",
    "phone": "+1 555 123 4567",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "dateOfBirth": "1995-05-15",
    "nationality": "US",
    "passportNumber": "US123456789"
  }'
```

### 2. Inscribir a una Materia
```bash
curl -X POST http://localhost:3000/students/enroll \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": "student-uuid",
    "courseId": "course-uuid",
    "enrollmentDate": "2024-01-15"
  }'
```

### 3. Ver Detalle Completo
```bash
curl http://localhost:3000/students/student-uuid/detail
```

## 📖 Documentación API

Una vez que la aplicación esté ejecutándose, puedes acceder a la documentación interactiva de Swagger en:

```
http://localhost:3000/api
```

## 🚀 Scripts Disponibles

```bash
# Desarrollo
npm run start:dev

# Producción
npm run start:prod

# Construir
npm run build

# Tests
npm run test
npm run test:e2e

# Linting
npm run lint
npm run format
```

## 🔍 Validaciones Implementadas

- ✅ Email único por estudiante
- ✅ Límite de 3 materias por estudiante
- ✅ No duplicación de materias
- ✅ No duplicación de profesores
- ✅ Validación de datos de entrada
- ✅ Manejo de errores HTTP apropiado

## 🌟 Características Adicionales

- **Soft Delete**: Los estudiantes no se eliminan físicamente
- **Timestamps**: Registro de fechas de creación y actualización
- **Validación de DTOs**: Validación automática de datos de entrada
- **Documentación Swagger**: API documentada automáticamente
- **CORS habilitado**: Para integración con frontend
- **Logging**: Registro de operaciones en desarrollo

