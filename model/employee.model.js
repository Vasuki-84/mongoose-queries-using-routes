const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});
const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;

