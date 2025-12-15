console.log("SERVER FILE LOADED");


const express = require("express");
const app = express();
app.use(express.json()); // use middleware
require("dotenv").config();
const dbConnection = require("./config/dbConnection.config"); // import config folder

const employeeRoutes = require("./routes/employee.routes");
const userRoutes = require("./routes/user.routes");




app.use("/employeeDetails", employeeRoutes); // base route
app.use("/auth",userRoutes)

dbConnection(); // call the imported config folder
app.listen(process.env.port, () => {
  console.log("8081 server running");
});
