-- Procedimiento almacenado para obtener resumen financiero de un estudiante
DELIMITER //

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
        SUM(e.totalPriceUSD * 0.85) AS total_price_eur, -- Tasa de cambio aproximada
        AVG(c.creditPriceUSD) AS average_credit_price,
        MAX(e.enrollmentDate) AS last_enrollment_date,
        MIN(e.enrollmentDate) AS first_enrollment_date
    FROM students s
    LEFT JOIN enrollments e ON s.id = e.studentId AND e.status = 'active'
    LEFT JOIN courses c ON e.courseId = c.id AND c.isActive = true
    WHERE s.id = studentId AND s.isActive = true
    GROUP BY s.id, s.firstName, s.lastName, s.email;
END //

DELIMITER ; 