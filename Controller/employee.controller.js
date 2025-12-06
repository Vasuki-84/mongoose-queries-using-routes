const employeeModel = require("../model/employee.model");

// POST API
const createEmployee = async (req, res) => {
  const { name, role, salary, companyName } = req.body;

  try {
    if (!name || !role || !salary || !companyName) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newEmployee = new employeeModel({ name, role, salary, companyName });
    await newEmployee.save(); // insert option in database
    res.status(201).json({ message: "New Employee Added" });
  } catch (err) {
    res.status(500).json({ message: "Employee not added " });
  }
};

// GET all
const getAllEmployees = async (req, res) => {
  try {
    const employee = await employeeModel.find();
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ message: "Employee fetching failed" });
  }
};

// GET data by ID
const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const employees = await employeeModel.findById(id);

    if (!employees) {
      return res.status(404).json({ message: "employee not found" });
    }
    return res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({message:"Employee not found"});
  }
};


module.exports = { createEmployee, getAllEmployees,getEmployeeById };
