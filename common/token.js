const jwt = require("jsonwebtoken");
const secret = "ABC123";
const User = require("../models/UserSchema");

const createToken = async (email) => {
  console.log("Creating token");
  const user = await User.findOne({ email: email });
  const userid = user._id;
  const payload = {
    userId: userid,
    email: email,
    role: "normal",
  };
  const token = jwt.sign(payload, secret);
  return token;
};

const verifyToken = (token) => {
  try {
    if (!token) {
      return { message: "TOken is missing" };
    }
    const user = jwt.verify(token, secret);
    return user;
  } catch (error) {
    console.log(error);
    return { message: "Invalid token" };
  }
};

module.exports = { createToken, verifyToken };
