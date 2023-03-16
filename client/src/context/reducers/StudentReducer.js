const StudentReducer = (state, action) => {
  switch (action.type) {
    case "addNewStudent":
      return {
        ...state,
        newStudent: action.payload,
      };
    case "getAllStudents":
      return {
        ...state,
        allStudents: action.payload,
      };

    case "getCurrentStudentId":
      return {
        ...state,
        currentStudentId: action.payload,
      };

    case "editStudent":
      return {
        ...state,
        editStudentData: action.payload,
      };

    case "getCurrentLevel":
      return {
        ...state,
        currentLevelId: action.payload,
      };
    case "getStudentCurrentLevelId":
      return {
        ...state,
        studentCurrentLevelId: action.payload,
      };
    case "getCurrentStudentSubjects":
      return {
        ...state,
        currentStudentSubjects: action.payload,
      };

    case "showCurrentStudentFeeReportView":
      return {
        ...state,
        showCurrentStudentFeeReportView: {
          show: action.payload.show,
          data: action.payload.data,
        },
      };

    case "showCurrentStudentAcademicsReportView":
      return {
        ...state,
        showCurrentStudentAcademicsReportView: {
          show: action.payload.show,
          examsDetails: action.payload.examsDetails,
        },
      };

    case "setCurrentStudentFeeInfo":
      return {
        ...state,
        currentStudentFeeInfo: action.payload,
      };

    default:
      return state;
  }
};

export default StudentReducer;
