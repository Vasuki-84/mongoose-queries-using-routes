// // 1. import Jsonwebtoken
// const jwt = require("jsonwebtoken");

// // interview qns
// // function currying : function that returns a functions
// const authMiddleware = (allowedRoles = []) => {
//   return (req, res, next) => {
//     // request the user token from api headers
//      try {
//     const authHeaders = req.headers.authorization;

//     // to check the token is got correctly : if no token or token without headers we pass a error
//     if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "unauthorized : No token provided" });
//     }
//     // Bearer adsfdfdfdfdjfbfjgfjhgfghfgvb

//     // ["Bearer", "adsfdfdfdfdjfbfjgfjhgfghfgvb"];
//     const token = authHeaders.split(" ")[1]; // to split bearer word from token

//       // decode the token
//       const decoded = jwt.verify(token, process.env.secret_key);

//       req.user = decoded;

//       // when allowedRoles is empty they can access all the details for login users
//       if (allowedRoles.length === 0) {
//         return next();
//       }

//       // if logged in user is admin but login user is user in decodedRole
//       if (!allowedRoles.includes(decoded.role)) {
//         return res
//           .status(403) // 403 forbidden error
//           .json({
//             message: "Forbidden : You don't have access to this resource",
//           });
//       }
//       next(); // inbuilt function in nodeJS
//     } catch (err) {
//       return res
//         .status(401)
//         .json({ message: "Unauthorized : invalid credentials" });
//     }
//   };
// };

// module.exports = authMiddleware;

const jwt = require("jsonwebtoken");

const authMiddleware = (allowedRoles = []) => {
  return (req, res, next) => {
    const authHeaders = req.headers.authorization;

    if (!authHeaders || !authHeaders.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    const token = authHeaders.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.secret_key);
      req.user = decoded;

      if (allowedRoles.length === 0) {
        return next();
      }

      if (!allowedRoles.includes(decoded.role)) {
        return res
          .status(403)
          .json({ message: "Forbidden : You don't have this access " });
      }
      next();
    } catch (err) {
      return res
        .status(401)
        .json({ message: "Unauthorized: invalid credentials" });
    }
  };
};

module.exports = authMiddleware;
