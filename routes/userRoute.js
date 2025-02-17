const express = require("express");
const router = express.Router();
const {
  handleCreateUser,
  handleUserLogin,
} = require("../controllers/userController");

router.get("/signUp", (req, res) => {
  return res.render("signUp");
});

router.get("/signIn", (req, res) => {
  return res.render("signIn");
});
router.post("/signUp", handleCreateUser);
router.post("/signIn", handleUserLogin);

module.exports = router;
