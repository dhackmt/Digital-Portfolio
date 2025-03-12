const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("crypto");

const AdminSchema = new mongoose.Schema(
  {
    adminEmail: {
      type: String,
      required: true,
      unique: true,
    },
    adminPassword: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

AdminSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("adminPassword")) return;

  const salt = randomBytes(10).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.adminPassword)
    .digest("hex");
  this.salt = salt;
  this.adminPassword = hashedPassword;
  next();
});

AdminSchema.static("matchPassword", async function (email, pass) {
  const user = await this.findOne({ adminEmail: email });
  console.log(user, "admin side");
  if (!user) {
    throw new Error("Admin not Found!");
  }
  const salt = user.salt;
  const userPassword = createHmac("sha256", salt).update(pass).digest("hex");
  if (userPassword === user.adminPassword) {
    return user;
  } else {
    throw new Error("Wrong credentials");
  }
});

const Admin = mongoose.model("admin", AdminSchema);

module.exports = Admin;
