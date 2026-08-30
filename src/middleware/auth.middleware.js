const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model.js");

async function authMiddleware(req, res, next) {
  const token =
    req.token || req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const isTokenBlacklisted = await tokenBlacklistModel.findOne({ token: token });
  if (isTokenBlacklisted) {
    return res.status(401).json({ message: "Unauthorized: Token is blacklisted" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.userId);

    req.user = user; // Attach the user object to the request for further use in the route handlers

    next(); // Call the next middleware or route handler

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}


async function authSystemUserMiddleware(req, res, next) {
  const token =
    req.token || req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.userId).select("+systemUser"); // Fetch the systemUser field explicitly
    if(!user.systemUser){
      return res.status(403).json({ message: "Forbidden: User is not a system user" });
    }
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}


module.exports = { authMiddleware, authSystemUserMiddleware };
