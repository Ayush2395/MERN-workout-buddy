import React from "react";
import { useAuth } from "../context/AuthContext";
import { useWorkout } from "../context/WorkoutContext";

const Workouts = ({ workout }) => {
  const { dispatch } = useWorkout();
  const { user } = useAuth();

  const fetchWorkout = async () => {
    if (!user) return;
    const response = await fetch(`/api/workouts/${workout._id}`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${user.token}` },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  return (
    <>
      <div className="workout-details">
        <h4>{workout.title}</h4>
        <p>
          <strong>Load (kg):</strong> {workout.load}
        </p>
        <p>
          <strong>Reps:</strong> {workout.reps}
        </p>
        <p>{workout.createdAt.slice(0, 10)}</p>
        <span onClick={fetchWorkout} className="material-symbols-outlined">
          delete
        </span>
      </div>
    </>
  );
};

export default Workouts;
