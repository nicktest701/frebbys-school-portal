import React, { useContext } from "react";
import Alert from "@mui/material/Alert";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";
import { Snackbar } from "@mui/material";
import { CheckCircleRounded, ErrorRounded } from "@mui/icons-material";
import Transition from "../animations/Transition";
const GlobalAlert = () => {
  const {
    schoolSessionState: { alertData },
    schoolSessionDispatch,
  } = useContext(SchoolSessionContext);

  const handleClose = () => {
    schoolSessionDispatch({
      type: "closeAlert",
    });
  };
  const borderColor = alertData?.severity === "error" ? "#B72136" : "#1890FF";

  return (
    <Snackbar
      anchorOrigin={{
        horizontal: "center",
        vertical: "top",
      }}
      open={alertData?.message ? true : false}
      autoHideDuration={7000}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <Alert
        icon={
          alertData?.severity === "info" ? (
            <CheckCircleRounded />
          ) : (
            <ErrorRounded />
          )
        }
        severity={alertData?.severity}
        onClose={handleClose}
        sx={{
          width: "100%",
          borderLeft: `2px solid ${borderColor}`,
        }}
      >
        {alertData?.message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalAlert;
