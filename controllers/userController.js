const User = require("../models/UserSchema");
const { createToken } = require("../common/token");

const handleCreateUser = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.render("signUp", {
        err: "User already Exists",
      });
    }

    const user = await User.create({
      email,
      password,
    });
    console.log(user);
    const token = await createToken(email);
    console.log(token);
    res.cookie("token", token);
    console.log(req.cookies.token);
    res.render("dashboard", {
      msg: "SignUp successful",
    });
  } catch (err) {
    res.render("signUp", {
      err: err,
    });
  }
};

const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.matchPassword(email, password);
    const token = await createToken(email);
    console.log(token);
    res.cookie("token", token);
    res.status(200).render("dashboard", {
      msg: "Login Successful",
    });
  } catch (err) {
    res.render("signIn", {
      err: err,
    });
  }
};

module.exports = {
  handleCreateUser,
  handleUserLogin,
};
