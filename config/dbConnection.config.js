const mongoose = require("mongoose");
const dbconnection = require("../../../../../MERN_Entri/Backend/mongoose/config/dbconnection.config");

const dbAtlas = async () => {
  try {
    await mongoose.connect(process.env.dbport, {
      ssl: true,
      tlsAllowInvalidCertificates: false,
    });
    console.log("database Atlas connected succcesfully");
  } catch (err) {
    console.log("database Atlas connection failed");
  }
};
module.exports= dbconnection;
