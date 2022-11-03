import React, { useEffect } from "react";
import WorkoutForm from "../components/WorkoutForm";
import Workouts from "../components/Workouts";
import { useWorkout } from "../context/WorkoutContext";

const Home = () => {
  const { workouts, dispatch } = useWorkout();

  useEffect(() => {
    // fetch workouts
    const fetchWorkout = async () => {
      const response = await fetch("/api/workouts");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };
    fetchWorkout();
  }, [dispatch]);

  return (
    <>
      <div className="home">
        <div className="workouts">
          {workouts &&
            workouts.map((workout) => (
              <Workouts key={workout._id} workout={workout} />
            ))}
        </div>
        <WorkoutForm />
      </div>
    </>
  );
};

export default Home;
