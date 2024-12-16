const express = require('express');
const {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
} = require('../controllers/employeeController');
const validateEmployee = require('../middleware/validateEmployee');

const router = express.Router();

// Employee routes
router.get('/', getAllEmployees);
router.get('/:id', getEmployeeById);
router.post('/', validateEmployee, createEmployee);
router.put('/:id', validateEmployee, updateEmployee);
router.delete('/:id', deleteEmployee);

module.exports = router;
