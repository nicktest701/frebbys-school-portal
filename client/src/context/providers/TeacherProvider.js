import React, { useReducer } from "react";
import TeacherReducer from "../reducers/TeacherReducer";

export const TeacherContext = React.createContext();
const TeacherProvider = ({ children }) => {
  const teacherValues = {
    viewTeacherData: {
      open: false,
      data: {},
    },
    editTeacherData: {
      open: false,
      data: {},
    },
    alertData: {
      severity: "",
      message: "",
    },
  };
  const [teacherState, teacherDispatch] = useReducer(
    TeacherReducer,
    teacherValues
  );

  return (
    <TeacherContext.Provider value={{ teacherState, teacherDispatch }}>
      {children}
    </TeacherContext.Provider>
  );
};

export default TeacherProvider;
