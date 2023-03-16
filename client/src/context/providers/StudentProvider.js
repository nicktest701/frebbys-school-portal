import React, { useReducer } from "react";
import StudentReducer from "../reducers/StudentReducer";

export const StudentContext = React.createContext();
const StudentProvider = ({ children }) => {
  const studentValues = {
    allStudents: [],

    currentStudentId: "",
    currentLevelId: "",
    studentCurrentLevelId: "",
    currentStudentSubjects: [],
    showCurrentStudentFeeReportView: {
      show: false,
      data: [],
    },
    showCurrentStudentAcademicsReportView: {
      show: false,
      examsDetails: {},
    },

    //current student fee info
    currentStudentFeeInfo: {
      id: "",
      level: "",
    },
    ///new student
    newStudent: {},
    ///Edit Student data
    editStudentData: {
      open: false,
      data: {},
    },
    //attendance
    
  };
  const [studentState, studentDispatch] = useReducer(
    StudentReducer,
    studentValues
  );

  return (
    <StudentContext.Provider value={{ studentState, studentDispatch }}>
      {children}
    </StudentContext.Provider>
  );
};

export default StudentProvider;
