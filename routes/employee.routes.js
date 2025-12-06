const express = require("express");
const router = express.Router();

const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployees,
  deleteEmployee,
} = require("../Controller/employee.controller");

// http://localhost:8081/employeeDetails/create
router.post("/create", createEmployee);

// http://localhost:8081/employeeDetails
router.get("/", getAllEmployees);

// http://localhost:8081/employeeDetails/<id in atlas database>
router.get("/:id", getEmployeeById);

// http://localhost:8081/employeeDetails/update/<mongodb-generated-id>
router.put("/update/:id", updateEmployees);

//http://localhost:8081/employeeDetails/delete/<mongoDB-generated-id>
router.delete("/delete/:id", deleteEmployee);

module.exports = router;
