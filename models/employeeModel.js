const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
});

// Get all employees
const getAllEmployeesFromDB = async () => {
    const result = await pool.query('SELECT * FROM employees');
    return result.rows;
};

// Get employee by ID
const getEmployeeByIdFromDB = async (id) => {
    const result = await pool.query('SELECT * FROM employees WHERE id = $1', [id]);
    return result.rows[0];
};

// Create a new employee
const createEmployeeInDB = async ({ name, email, phone, department, dob, role }) => {
    const result = await pool.query('SELECT MAX(id) AS maxId FROM employees');
    const maxId = result.rows[0].maxid || 'EMP0000';
    const newId = `EMP${(parseInt(maxId.slice(3)) + 1).toString().padStart(4, '0')}`;

    const insertQuery = `
    INSERT INTO employees (id, name, email, phone, department, dob, role)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;
    const values = [newId, name, email, phone, department, dob, role];
    const insertResult = await pool.query(insertQuery, values);

    return insertResult.rows[0];
};

// Update an employee
const updateEmployeeInDB = async (id, { name, email, phone, department, dob, role }) => {
    const updateQuery = `
    UPDATE employees
    SET name = $1, email = $2, phone = $3, department = $4, dob = $5, role = $6
    WHERE id = $7
    RETURNING *;
  `;
    const values = [name, email, phone, department, dob, role, id];
    const result = await pool.query(updateQuery, values);

    if (result.rowCount === 0) {
        throw new Error('Employee not found');
    }

    return result.rows[0];
};

// Delete an employee
const deleteEmployeeFromDB = async (id) => {
    const result = await pool.query('DELETE FROM employees WHERE id = $1', [id]);
    if (result.rowCount === 0) {
        throw new Error('Employee not found');
    }
};

module.exports = {
    getAllEmployeesFromDB,
    getEmployeeByIdFromDB,
    createEmployeeInDB,
    updateEmployeeInDB,
    deleteEmployeeFromDB,
};
