const express = require("express");
const app = express();
require("dotenv").config();
const dbConnection = require("./config/dbConnection.config"); // import config folder
const employeeRoutes = require("./routes/employee.routes");


app.use(express.json()); // use middleware

app.use("/employeeDetails", employeeRoutes); // base route

dbConnection(); // call the imported config folder
app.listen(process.env.port, () => {
  console.log("8081 server running");
});
