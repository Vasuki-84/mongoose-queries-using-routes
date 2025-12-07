const userModel = require("../model/user.model");

// install jsonwebtoken bcryptjs

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Register API for user

// POST = method

const registerAPI = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const emailCheck = await userModel.findOne({ email }); // findOne() checks only email

    if (emailCheck) {
      return res.status(400).json({ message: "Email already exists" });
    }
    // password hashing
    const hashedPassword = await bcrypt.hash(password, 10); // create

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    res.status(201).json({ message: "user registered" });
  } catch (err) {
    res.status(500).json({ message: "user not registered" });
  }
};

// User login API
// POST api

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not registered" });
  }

  const passwordCheck = await bcrypt.compare(password, user.password); // hash and compare with registered pw
  if (!passwordCheck) {
    return res.status(401).json({ message: "Password doesn't match" });
  }

  // JWT Token genaration
  const Token = jwt.sign(
    { user: user._id, name: user.name, email: user.email },
    process.env.secret_key,
    { expiresIn: "24h" }
  );
  res.status(200).json({ message: "login successful" });
}; // jwt genarates unique secret key

module.exports = { registerAPI, loginUser };
