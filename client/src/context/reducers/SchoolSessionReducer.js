import _ from "lodash";

const SchoolSessionReducer = (state, { type, payload }) => {
  switch (type) {
    case "displayAddSession":
      return {
        ...state,
        displayAddSession: payload,
      };
    case "setCurrentSession":
      return {
        ...state,
        currentSession: payload,
      };
    case "currentLevel":
      return {
        ...state,
        currentLevel: payload,
      };

    case "subjectsWithScore":
      return {
        ...state,
        subjectsWithScore: payload,
      };

    case "setSessionEditData":
      return {
        ...state,
        sessionEditData: payload,
      };

    case "setFeeEditData":
      return {
        ...state,
        feeEditData: payload,
      };

    case "setStudentFeesHistoryId":
      return {
        ...state,
        studentFeesHistoryId: payload,
      };

    case "openAddExamsScore":
      return {
        ...state,
        examsScore: payload,
      };

    case "openViewReport":
      return {
        ...state,
        viewReport: {
          ...state.viewReport,
          open: true,
        },
      };
    case "closeViewReport":
      return {
        ...state,
        viewReport: {
          ...state.viewReport,
          open: false,
        },
      };
    case "setReportData":
      return {
        ...state,
        viewReport: {
          ...state.viewReport,
          data: payload,
        },
      };

    case "sendQuickMessage":
      return {
        ...state,
        quickMessageData: payload,
      };

    case "showAlert":
      return {
        ...state,
        alertData: payload,
      };
    case "closeAlert":
      return {
        ...state,
        alertData: {
          ...state.alertData,
          message: "",
        },
      };

    case "openFileDialog":
      return {
        ...state,
        fileData: {
          open: true,
          columns: _.uniq(payload?.flatMap(Object.keys)),
          data: payload,
        },
      };
    case "closeFileDialog":
      return {
        ...state,
        fileData: {
          open: false,
          columns: [],
          data: [],
        },
      };

    case "openAddStudentFileDialog":
      return {
        ...state,
        addStudentFileData: {
          open: true,
          columns: _.uniq(payload.data?.flatMap(Object.keys)),
          data: payload.data ?? [],
          type: payload.type,
        },
      };
    case "closeAddStudentFileDialog":
      return {
        ...state,
        addStudentFileData: {
          open: false,
          columns: [],
          data: [],
          type: "",
        },
      };

    case "viewUser":
      return {
        ...state,
        userViewData: {
          open: payload.open,
          data: payload.data,
        },
      };

    case "editUser":
      return {
        ...state,
        userEditData: {
          open: payload.open,
          data: payload.data,
        },
      };

    default:
      return state;
  }
};

export default SchoolSessionReducer;
