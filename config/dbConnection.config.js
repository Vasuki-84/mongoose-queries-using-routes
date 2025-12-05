const mongoose = require("mongoose");

const dbconnection = async () => {
  try {
    await mongoose.connect(process.env.dbport);
    console.log("connection success");
  } catch (err) {
    console.log("connection failed");
  }
};
module.exports = dbconnection;

// const dbAtlas = async () => {
//   try {
//     await mongoose.connect(process.env.dbport, {
//       ssl: true,
//       tlsAllowInvalidCertificates: false,
//     });
//     console.log("database Atlas connected succcesfully");
//   } catch (err) {
//     console.log("database Atlas connection failed");
//   }
// };
// module.exports= dbconnection;
