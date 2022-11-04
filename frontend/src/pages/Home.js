import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WorkoutForm from "../components/WorkoutForm";
import Workouts from "../components/Workouts";
import { useAuth } from "../context/AuthContext";
import { useWorkout } from "../context/WorkoutContext";

const Home = () => {
  const { workouts, dispatch } = useWorkout();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // fetch workouts
    const fetchWorkout = async () => {
      const response = await fetch("/api/workouts", {
        headers: { authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };
    if (user) {
      fetchWorkout();
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [dispatch, user, navigate]);

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
