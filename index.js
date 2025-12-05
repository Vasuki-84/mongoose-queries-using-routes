const express = require("express");
const app = express();
require("dotenv").config();
const dbConnection = require("./config/dbConnection.config"); // import config folder

app.use(express.json()); // use middleware
dbConnection(); // call the imported config folder
app.listen(process.env.port, () => {
  console.log("8081 server running");
});
