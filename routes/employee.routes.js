const express = require("express");
const router = express.Router();

const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployees,
  deleteEmployee,
} = require("../Controller/employee.controller");

const authMiddleware = require("../middleware/authmiddleware");

// access - admin
// http://localhost:8081/employeeDetails/create
router.post("/create", authMiddleware(["admin"]), createEmployee);

// access - public = no need to add middleware for public
// http://localhost:8081/employeeDetails
router.get("/", getAllEmployees);

// access - login user
// http://localhost:8081/employeeDetails/<id in atlas database>
router.get("/:id", authMiddleware(), getEmployeeById);

// access - admin
// http://localhost:8081/employeeDetails/update/<mongodb-generated-id>
router.put("/update/:id", authMiddleware(["admin"]), updateEmployees);

// access - admin
//http://localhost:8081/employeeDetails/delete/<mongoDB-generated-id>
router.delete("/delete/:id", authMiddleware(["admin"]), deleteEmployee);

module.exports = router;
