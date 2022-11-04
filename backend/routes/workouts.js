const {
  workout_post,
  workout_get,
  singleWorkout_get,
  workout_delete,
  workout_patch,
} = require("../controller/workoutController");

const workouts = require("express").Router();
const requireAuth = require("../middleware/requireAuth");

workouts.use(requireAuth);
/*=============GET all workouts========== */
workouts.get("/", workout_get);

/*=============GET Single workouts=========== */
workouts.get("/:id", singleWorkout_get);

/*===============POST workouts============= */
workouts.post("/", workout_post);

/*=============DELETE workout================ */
workouts.delete("/:id", workout_delete);

/*==============Update Workout============ */
workouts.patch("/:id", workout_patch);

module.exports = workouts;
