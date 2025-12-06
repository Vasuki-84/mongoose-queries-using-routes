const express = require("express");
const router = express.Router();

const { createEmployee, getAllEmployees, getEmployeeById } = require("../Controller/employee.controller");


// http://localhost:8081/employeeDetails/create
router.post("/create", createEmployee);

// http://localhost:8081/employeeDetails
router.get("/",getAllEmployees);

// http://localhost:8081/employeeDetails/<id in atlas database>
router.get("/:id",getEmployeeById);

module.exports = router;
