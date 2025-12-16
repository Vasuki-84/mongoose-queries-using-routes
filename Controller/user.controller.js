

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
    console.log(newUser);
  } catch (err) {
    res.status(500).json({ message: "user not registered" });
    console.log(err);
  }
};

//  *User login API
// POST api

const loginUser = async (req, res) => {
  console.log( req.body);
  try {
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
      { user: user._id, name: user.name, email: user.email, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );
    res.status(200).json({ message: "login successful", Token: Token });
  } catch (err) {
      console.error("Login error:", err);
    return res.status(500).json({
      message: err.message,
    });
  }
}; // jwt genarates unique secret key

module.exports = { registerAPI, loginUser };
