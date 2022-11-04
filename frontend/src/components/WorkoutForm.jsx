import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useWorkout } from "../context/WorkoutContext";

const WorkoutForm = () => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState({ error: false, msg: "" });

  const { dispatch } = useWorkout();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      return setError("You must be logged in");
    }

    if (title === "" || (load && reps) === null) {
      return setEmptyFields({ error: true, msg: "Please fill input field" });
    }

    const workout = { title, load, reps };

    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setTitle("");
      setLoad("");
      setReps("");
      console.log("New workout added", json);
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="create">
        <h4>Add Workout</h4>
        <label>Workout Title:</label>
        <input
          value={title}
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          className={emptyFields?.error ? "error" : ""}
        />
        <label>Workout Load (KG):</label>
        <input
          value={load}
          type="number"
          onChange={(e) => setLoad(e.target.value)}
          className={emptyFields?.error ? "error" : ""}
        />
        <label>Workout Reps:</label>
        <input
          value={reps}
          type="number"
          onChange={(e) => setReps(e.target.value)}
          className={emptyFields?.error ? "error" : ""}
        />
        <button type="submit">Add Workout</button>
        {error && <div className="error">{error}</div>}
        {emptyFields?.msg && <div className="error">{emptyFields?.msg}</div>}
      </form>
    </>
  );
};

export default WorkoutForm;
