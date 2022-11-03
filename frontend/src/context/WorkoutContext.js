import { createContext, useContext, useReducer } from "react";

const WorkoutContext = createContext();

const workoutsReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      };
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const WorkoutContextProviver = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, { workouts: null });

  return (
    <>
      <WorkoutContext.Provider value={{ ...state, dispatch }}>
        {children}
      </WorkoutContext.Provider>
    </>
  );
};

/*=========custom hooks======== */
export const useWorkout = () => {
  const hook = useContext(WorkoutContext);

  if (!hook) throw Error("useWorkout used inside the WorkoutContext");
  return hook;
};
