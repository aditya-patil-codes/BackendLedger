const userModel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const emailService = require("../services/email.service.js");
const tokenBlacklistModel = require("../models/blacklist.model.js");
// user register controller
// POST / api/auth/register

async function userRegisterController(req, res) {
  const { email, password, name } = req.body;

  const isExists = await userModel.findOne({
    email: email
  });

  if (isExists) {
    return res.status(422).json({
      message: "User already Exists with this email.",
      status: "failed"
    });
  }

  const user = await userModel.create({
    email,
    password,
    name
  });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d"
  });

  res.cookie("token", token);

  res.status(201).json({
    user: {
      _id: user._id,
      email: user.email,
      name: user.name,
      systemUser: Boolean(user.systemUser)
    },
    token
  }); // if we create a resourse then send 201

  await emailService.sendRegistrationEmail(user.email, user.name);
}

// user login controller
// POST / api/auth/login

async function userLoginController(req, res) {
  const { email, password } = req.body;

  const user = await userModel
    .findOne({ email: email })
    .select("+password +systemUser");

  if (!user) {
    return res.status(400).json({ message: "email or password is invalid" });
  }

  const isValidPassword = await user.comparePassword(password);

  if (!isValidPassword) {
    return res.status(401).json({
      message: "email or password is invalid"
    });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d"
  });

  res.cookie("token", token);

  res.status(200).json({
    user: {
      _id: user._id,
      email: user.email,
      name: user.name,
      systemUser: Boolean(user.systemUser)
    },
    token
  }); // if we create a resourse then send 201
}

// user logout controller

async function userLogoutController(req, res) {
  const token =
    req.token || req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  res.clearCookie("token");

  await tokenBlacklistModel.create({ token: token });

  res.status(200).json({
    message: "User logged out successfully"
  });
}

module.exports = {
  userRegisterController,
  userLoginController,
  userLogoutController
};
