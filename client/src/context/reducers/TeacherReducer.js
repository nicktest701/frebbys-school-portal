const TeacherReducer = (state, action) => {
  switch (action.type) {
    case "viewTeacher":
      return {
        ...state,
        viewTeacherData: action.payload,
      };

    case "editTeacher":
      return {
        ...state,
        editTeacherData: action.payload,
      };

    case "showAlert":
      return {
        ...state,
        alertData: action.payload,
      };
    case "closeAlert":
      return {
        ...state,
        alertData: {},
      };

    default:
      return state;
  }
};

export default TeacherReducer;
