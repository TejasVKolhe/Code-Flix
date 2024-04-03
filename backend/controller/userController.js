const asyncHandler = require("express-async-handler");
const User = require("../model/userSchema");
const bcrypt = require("bcryptjs");

//user auth
//POST /api/user/login
// private

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (user) {
    if (await bcrypt.compare(password, user.password)) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(401).json({ msg: "wrong password" });
      throw new Error("Invalid Email or Password");
    }
  } else {
    res.status(401).json({ msg: "user not found" });
    throw new Error("User Not Found");
  }
});

//user register
//POST /api/user/create
// private

const createUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email: email });

    console.log("Create user request received!");

    if (userExist) {
      return res.status(400).json("User already exists"); // Use 400 for Bad Request
    }
    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
    });

    // No need to call save() here

    res.status(201).json({ message: "User created successfully!" }); // Send a success response
  } catch (error) {
    console.error({ message: error });
    // Handle specific errors here, e.g., validation errors
    res.status(500).json({ message: "Internal server error" }); // Generic error for unexpected issues
  }
});

module.exports = { authUser, createUser };
