import React, { useContext, useState } from "react";
import { ArrowForwardRounded, StyleOutlined } from "@mui/icons-material";
import {
  Container,
  Autocomplete,
  Button,
  TextField,
  Typography,
  Fab,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllTerms } from "../api/termAPI";
import { SchoolSessionContext } from "../context/providers/SchoolSessionProvider";

const SchoolSession = () => {
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);

  const navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const [sessionError, setSessionError] = useState("");
  const [session, setSession] = useState({
    termId: "",
    academicYear: "",
    term: "",
  });

  useQuery(["terms"], getAllTerms, {
    onSuccess: (sessions) => {
      setOptions(sessions);
    },
  });

  const handleSession = () => {
    
    setSessionError("");
    if (session.termId === "") {
      setSessionError("Session is Required*");
      return;
    }
    schoolSessionDispatch({ type: "setCurrentSession", payload: session });

    localStorage.setItem("@school_session", JSON.stringify(session));
    navigate("/", {
      replace: true,
    });
    
  };

  const handleOpenDialog = () => {
    schoolSessionDispatch({ type: "displayAddSession", payload: true });
  };

  return (
    <>
      <Container
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
        maxWidth="xs"
      >
        <StyleOutlined sx={{ width: 80, height: 80 }} />
        <Typography variant="h4" sx={{ paddingBottom: 2, textAlign: "center" }}>
          School Portal
        </Typography>
        <Autocomplete
          options={options}
          noOptionsText="School Session not found"
          closeText=""
          disableClearable={true}
          fullWidth
          value={session}
          onChange={(e, value) => setSession(value)}
          isOptionEqualToValue={(option, value) =>
            value.termId === "" ||
            value.termId === undefined ||
            option.termId === value.termId
          }
          getOptionLabel={(option) =>
            option?.termId !== ""
              ? `${option?.academicYear},${option?.term}`
              : ""
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select School Session"
              error={sessionError !== "" ? true : false}
              helperText={sessionError}
              FormHelperTextProps={{
                sx: { color: "error.main" },
              }}
            />
          )}
        />

        <Button
          variant="contained"
          endIcon={<ArrowForwardRounded />}
          fullWidth
          onClick={handleSession}
        >
          Continue
        </Button>
        <Fab
          variant="extended"
          color="primary"
          sx={{
            position: "absolute",
            right: 5,
            top: 5,
          }}
          onClick={handleOpenDialog}
        >
          New School Session
        </Fab>
      </Container>
    </>
  );
};

export default SchoolSession;
