const employeeModel = require("../model/employee.model");

// POST API
const createEmployee = async (req, res) => {
  const { name, role, salary, companyName } = req.body;

  try {
    if (!name || !role || !salary || !companyName) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newEmployee = new productModel({ name, role, salary, companyName });
    await newEmployee.save(); // insert option in database
    res.status(201).json({ message: "New Employee Added" });
  } catch (err) {
    res.status(500).json({ message: "Employee not added " });
  }
};

module.exports = createEmployee;
