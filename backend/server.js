const express = require("express");
const workouts = require("./routes/workouts");
const port = process.env.PORT || 8000;
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
require("dotenv").config();

/*=================middleware============== */
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

/*==============MongoDB Database connection============ */
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", () => console.log("Error in connecting to database"));
db.once("open", () => console.log("Database connected"));

/*==============Workout routes============ */
app.use("/api/workouts", workouts);
app.use("/api/user", userRoute);

/*=================requests listening on port============ */
app.listen(port, () => console.log(`server running on port ${port}`));
