const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    // validate: [isEmail, "Please enter valid email"],
  },
  password: {
    type: String,
    required: true,
    // minlength: [6, "Password should be more than 6 character"],
  },
});

/*=============hashing password and signup using static method=========== */
userSchema.statics.signup = async function (email, password) {
  // email and password validation
  if (!email || !password) {
    throw Error("All fields are required");
  }
  if (!validator.default.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.default.isStrongPassword(password)) {
    throw Error("Your password is weak");
  }

  // checking for existing user
  const isEmailExist = await this.findOne({ email });
  if (isEmailExist) {
    throw Error("Email already exist.");
  }

  // hashing password
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });
  return user;
};

userSchema.statics.login = async function (email, password) {
  // email and password validation
  if (!email || !password) {
    throw Error("All fields are require");
  }

  //   check, is there any user exist or not?
  const isUser = await this.findOne({ email });
  if (!isUser) {
    throw Error("User not registered");
  }

  const match = await bcrypt.compare(password, isUser.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return isUser;
};

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
