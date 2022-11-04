const { login_post, signup_post } = require("../controller/userController");

const userRoute = require("express").Router();

/*===========Login router========== */
userRoute.post("/login", login_post);

/*==========Sign up router========== */
userRoute.post("/signup", signup_post);

module.exports = userRoute;
