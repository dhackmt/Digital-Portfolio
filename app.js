const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const UserRoute = require("./routes/userRoute");
const { isAuthorized } = require("./common/authmiddleware");
const {
  handleFormData,
  handelGetData,
} = require("./controllers/formController");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "./templates"));
app.use(express.static(path.join(__dirname, "./public")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//mongoDb connection
mongoose
  .connect("mongodb://127.0.0.1:27017/portfolio")
  .then(() => console.log("MongoDb connected...."))
  .catch((err) => console.log("Error in connecting mongoDB", err));

app.use("/user", UserRoute);

app.post("/submit", isAuthorized("normal"), handleFormData);

app.get("/template1/index", (req, res) => {
  res.render("template1/index", portfolioData);
});

app.get("/template2/index", (req, res) => {
  res.render("template2/index", portfolioData);
});

//about page;
app.get("/template2/pages/about", (req, res) => {
  res.render("template2/pages/about", portfolioData);
});

app.get("/template2/pages/contact", (req, res) => {
  res.render("template2/pages/contact", portfolioData);
});

app.get("/getData/:template", isAuthorized("normal"), handelGetData);

app.get("/form/index", (req, res) => {
  res.render("form/index");
});

app.listen(3000, () => {
  console.log("server is running");
});
