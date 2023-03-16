import React, { useContext } from "react";
import Alert from "@mui/material/Alert";
import { TeacherContext } from "../../context/providers/TeacherProvider";
import { Snackbar } from "@mui/material";
const TeacherAlert = () => {
  const {
    teacherState: { alertData },
    teacherDispatch,
  } = useContext(TeacherContext);

  const handleClose = () => {
    teacherDispatch({
      type: "closeAlert",
    });
  };

  return (
    <Snackbar
      anchorOrigin={{
        horizontal: "center",
        vertical: "top",
      }}
      open={true}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        severity={alertData?.severity}
        onClose={handleClose}
        sx={{ width: "100%" }}
      >
        {alertData?.message}
      </Alert>
    </Snackbar>
  );
};

export default TeacherAlert;
