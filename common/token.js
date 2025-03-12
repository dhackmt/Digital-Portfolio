const jwt = require("jsonwebtoken");
const secret = "ABC123";
const User = require("../models/UserSchema");
const Admin = require("../models/adminSchema");

const createToken = async (email, role) => {
  console.log("Creating token for", role);
  let user;
  if (role == "user") {
    user = await User.findOne({ email: email });
  } else if (role == "admin") {
    user = await Admin.findOne({ adminEmail: email });
  }
  console.log(user);
  const userid = user._id;
  const payload = {
    userId: userid,
    email: email,
    role: role,
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
