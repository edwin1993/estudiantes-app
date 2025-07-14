import { DataSource } from 'typeorm';

// Configuración directa para el script
const dataSourceConfig = {
  type: 'mysql' as const,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '12345',
  database: process.env.DB_DATABASE || 'estudiantes_app',
};

async function createStoredProcedure() {
  const dataSource = new DataSource(dataSourceConfig);
  
  try {
    await dataSource.initialize();
    console.log('✅ Conexión a la base de datos establecida');

    const queryRunner = dataSource.createQueryRunner();
    
    // Crear el procedimiento almacenado
    const storedProcedureSQL = `
      DROP PROCEDURE IF EXISTS GetStudentFinancialSummary;
      
      CREATE PROCEDURE GetStudentFinancialSummary(IN studentId VARCHAR(36))
      BEGIN
          SELECT 
              s.id AS student_id,
              s.firstName,
              s.lastName,
              s.email,
              COUNT(e.id) AS total_courses,
              SUM(c.credits) AS total_credits,
              SUM(e.totalPriceUSD) AS total_price_usd,
              SUM(e.totalPriceUSD * 0.85) AS total_price_eur,
              AVG(c.creditPriceUSD) AS average_credit_price,
              MAX(e.enrollmentDate) AS last_enrollment_date,
              MIN(e.enrollmentDate) AS first_enrollment_date
          FROM students s
          LEFT JOIN enrollments e ON s.id = e.studentId AND e.status = 'active'
          LEFT JOIN courses c ON e.courseId = c.id AND c.isActive = true
          WHERE s.id = studentId AND s.isActive = true
          GROUP BY s.id, s.firstName, s.lastName, s.email;
      END;
    `;

    await queryRunner.query(storedProcedureSQL);
    console.log('Procedimiento almacenado creado exitosamente');
    
  } catch (error) {
    console.error('Error al crear el procedimiento almacenado:', error);
  } finally {
    await dataSource.destroy();
    console.log('Conexión cerrada');
  }
}

createStoredProcedure(); 