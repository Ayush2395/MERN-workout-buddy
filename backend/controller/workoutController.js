const workoutModel = require("../models/workout");
const mongoose = require("mongoose");

/*=============GET all workout controller============= */
const workout_get = async (req, res) => {
  const workout = await workoutModel.find().sort({ createdAt: -1 });
  res.status(200).json(workout);
};

/*=============GET Single workout controller============= */
const singleWorkout_get = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "There's no such workout" });

  const workout = await workoutModel.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "No workout" });
  }

  res.status(200).json(workout);
};

/*=============workout post controller============ */
const workout_post = async (req, res) => {
  const { title, reps, load } = req.body;

  try {
    const workout = await workoutModel.create({ title, reps, load });
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/*============DELETE workout controller========== */
const workout_delete = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "no such workout" });

  const workout = await workoutModel.findOneAndDelete({ _id: id });

  if (!workout) return res.status(404).json({ error: "no such workout" });

  res.status(200).json(workout);
};

/*==============PATCH workout controller========= */
const workout_patch = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "no such workout" });

  const workout = await workoutModel.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );

  if (!workout) return res.status(404).json({ error: "no such workout" });

  res.status(200).json(workout);
};

module.exports = {
  workout_get,
  singleWorkout_get,
  workout_post,
  workout_delete,
  workout_patch,
};
