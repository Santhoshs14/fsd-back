const {
    getAllEmployeesFromDB,
    getEmployeeByIdFromDB,
    createEmployeeInDB,
    updateEmployeeInDB,
    deleteEmployeeFromDB,
} = require('../models/employeeModel');

// Get all employees
const getAllEmployees = async (req, res, next) => {
    try {
        const employees = await getAllEmployeesFromDB();
        res.status(200).json(employees);
    } catch (error) {
        next(error);
    }
};

// Get an employee by ID
const getEmployeeById = async (req, res, next) => {
    try {
        const employee = await getEmployeeByIdFromDB(req.params.id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        next(error);
    }
};

// Create a new employee
const createEmployee = async (req, res, next) => {
    try {
        const newEmployee = await createEmployeeInDB(req.body);
        res.status(201).json(newEmployee);
    } catch (error) {
        next(error);
    }
};

// Update an employee
const updateEmployee = async (req, res, next) => {
    try {
        const updatedEmployee = await updateEmployeeInDB(req.params.id, req.body);
        res.status(200).json(updatedEmployee);
    } catch (error) {
        next(error);
    }
};

// Delete an employee
const deleteEmployee = async (req, res, next) => {
    try {
        await deleteEmployeeFromDB(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
};
