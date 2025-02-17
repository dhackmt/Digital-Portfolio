const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("crypto");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
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

UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;

  const salt = randomBytes(10).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");
  this.salt = salt;
  this.password = hashedPassword;
  next();
});

UserSchema.static("matchPassword", async function (email, pass) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("User not Found!");
  }
  const salt = user.salt;
  const userPassword = createHmac("sha256", salt).update(pass).digest("hex");
  if (userPassword === user.password) {
    return user;
  } else {
    throw new Error("Wrong credentials");
  }
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
