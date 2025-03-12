const Admin = require("../models/adminSchema");
const { createToken } = require("../common/token");
const formSchema = require("../models/formSchema");
const User = require("../models/UserSchema");

const handleCreateAdmin = async (req, res) => {
  console.log(req.body);
  console.log("Admin side reached");
  const { adminEmail, adminPassword } = req.body;
  try {
    const existingEmail = await Admin.findOne({ adminEmail });
    if (existingEmail) {
      return res.render("signUp", {
        err: "Admin already Exists",
      });
    }

    const user = await Admin.create({
      adminEmail,
      adminPassword,
    });
    console.log(user);
    const token = await createToken(adminEmail, "admin");
    console.log(token);
    res.cookie("token", token);
    console.log(req.cookies.token);

    //get form count
    const data = await formSchema.find();
    const totalCount = data.length;
    console.log(totalCount);

    //get user count
    const userData = await User.find();
    const userCount = userData.length;
    console.log(userCount);
    res.render("adminDashboard", {
      msg: "SignUp successful",
      totalCount: totalCount,
      userCount: userCount,
    });
  } catch (err) {
    res.render("adminSignUp", {
      err: err,
    });
  }
};

const handleAdminLogin = async (req, res) => {
  const { adminEmail, adminPassword } = req.body;
  try {
    console.log("Admin side reached");
    console.log(req.body);
    console.log("Admin password and email", adminPassword, adminEmail);
    const user = await Admin.matchPassword(adminEmail, adminPassword);
    console.log(user);
    const token = await createToken(adminEmail, "admin");
    console.log(token);
    res.cookie("token", token);

    //get form count
    const data = await formSchema.find();
    const totalCount = data.length;
    console.log(totalCount);

    //get user count

    const userData = await User.find();
    const userCount = userData.length;
    res.status(200).render("adminDashboard", {
      msg: "Login Successful",
      totalCount: totalCount,
      userCount: userCount,
    });
  } catch (err) {
    res.render("adminSignIn", {
      err: err,
    });
  }
};

module.exports = {
  handleCreateAdmin,
  handleAdminLogin,
};
