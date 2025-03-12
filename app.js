const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const UserRoute = require("./routes/userRoute");
const AdminRoute = require("./routes/adminRoute");
const { isAuthorized } = require("./common/authmiddleware");
const {
  handleFormData,
  handelGetData,
} = require("./controllers/formController");
const cookieParser = require("cookie-parser");
const FormData = require("./models/formSchema");

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

app.use("/admin", AdminRoute);
app.post("/submit", isAuthorized("user", "admin"), handleFormData);

// app.get("/template1/index", (req, res) => {
//   res.render("template1/index", portfolioData);
// });

app.get("/template2/index", (req, res) => {
  res.render("template2/index");
});

app.get(
  "/template2/pages/about",
  isAuthorized("user", "admin"),
  async (req, res) => {
    const user = req.user;
    if (!user) {
      return res.redirect("/login"); // Ensure user is authenticated
    }

    const userId = user.userId;
    const userFormData = await FormData.findOne({
      userId: userId,
      archieve: false,
    });

    if (!userFormData) {
      return res.render("./form/index", {
        message: "You need to fill the form first",
      });
    }

    res.render("template2/pages/about", { portfolioData: userFormData });
  }
);

app.get(
  "/template2/pages/contact",
  isAuthorized("user", "admin"),
  async (req, res) => {
    const user = req.user;
    const userId = user.userId;
    const userFormData = await FormData.findOne({
      userId: userId,
      archieve: false,
    });

    if (!userFormData) {
      return res.render("./form/index", {
        message: "You need to fill the form first",
      });
    }

    res.render("template2/pages/contact", { portfolioData: userFormData });
  }
);

app.get("/getData/:template", isAuthorized("user", "admin"), handelGetData);

app.get("/form/index", (req, res) => {
  res.render("form/index");
});

app.listen(3000, () => {
  console.log("server is running");
});
