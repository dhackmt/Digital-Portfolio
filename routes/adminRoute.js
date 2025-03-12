const express = require("express");
const router = express.Router();
const { isAuthorized } = require("../common/authmiddleware");
const formSchema = require("../models/formSchema");
const UserSchema = require("../models/UserSchema");
const {
  handleCreateAdmin,
  handleAdminLogin,
} = require("../controllers/adminController");

router.get("/adminDashboard", isAuthorized("admin"), async (req, res) => {
  //get form Count
  const data = await formSchema.find();
  const totalCount = data.length;
  //get user data
  const userData = await UserSchema.find();
  const userCount = userData.length;
  console.log(totalCount);
  return res.render("adminDashboard", {
    totalCount: totalCount,
    userCount: userCount,
  });
});

router.get("/adminSignUp", (req, res) => {
  return res.render("adminSignUp");
});

router.get("/adminSignIn", (req, res) => {
  return res.render("adminSignIn");
});
router.post("/adminSignUp", handleCreateAdmin);
router.post("/adminSignIn", handleAdminLogin);

module.exports = router;
