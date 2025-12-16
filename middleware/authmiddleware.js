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
