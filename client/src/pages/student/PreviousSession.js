import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { getAllPreviousLevels } from "../../api/currentLevelAPI";
import { getAllTerms } from "../../api/termAPI";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";

function PreviousSession({ open, setOpen }) {
  const session = JSON.parse(localStorage.getItem("@school_session"));
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);

  const [options, setOptions] = useState([]);
  const [levelsOptions, setLevelsOptions] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState({
    _id: "",
    levelType: "",
    students: [],
  });

  const [selectedSession, setSelectedSession] = useState({
    termId: "",
    sessionId: "",
    label: "",
  });

  useQuery(["terms"], getAllTerms, {
    onSuccess: (sessions) => {
      const filteredSchoolSession = [];
      sessions.forEach(({ termId, sessionId, academicYear, term }) => {
        // filter out current school session
        if (termId !== session.termId) {
          filteredSchoolSession.push({
            termId,
            sessionId,
            label: `${academicYear},${term}`,
          });
        }
      });
      setOptions(filteredSchoolSession);
    },
  });

  useQuery({
    queryKey: ["previous-levels", selectedSession?.termId],
    queryFn: () => getAllPreviousLevels(selectedSession),
    enabled: !!selectedSession?.termId,
    onSuccess: (levels) => {
      // console.log(levels);
      const modifiedLevels = levels.map(({ _id, level, students }) => {
        return {
          _id,
          levelType: `${level.name}${level.type}`,
          students,
        };
      });
      setLevelsOptions(modifiedLevels);
    },
  });

  //LOAD students
  const handleLoadStudents = () => {
    if (selectedLevel.students.length !== 0) {
      schoolSessionDispatch({
        type: "openAddStudentFileDialog",
        payload: { data: selectedLevel?.students, type: "previous" },
      });
    }
  };

  return (
    <Dialog open={open} maxWidth="xs" fullWidth>
      <DialogTitle> Students from Session</DialogTitle>
      <DialogContent>
        <Stack spacing={2} paddingY={2}>
          <Autocomplete
            size="small"
            options={options}
            noOptionsText="No session available"
            disableClearable={true}
            fullWidth
            value={selectedSession}
            onChange={(e, value) => setSelectedSession(value)}
            isOptionEqualToValue={(option, value) =>
              option.termId === value.termId ||
              value.termId === "" ||
              value.termId === undefined
            }
            getOptionLabel={(option) => option.label || ""}
            renderInput={(params) => (
              <TextField {...params} label="Select School Session" />
            )}
          />
          <Autocomplete
            size="small"
            options={levelsOptions}
            noOptionsText="No level available"
            disableClearable={true}
            fullWidth
            value={selectedLevel}
            onChange={(e, value) => setSelectedLevel(value)}
            isOptionEqualToValue={(option, value) =>
              option._id === value._id ||
              value._id === "" ||
              value._id === undefined
            }
            getOptionLabel={(option) => option.levelType || ""}
            renderInput={(params) => (
              <TextField {...params} label="Select Level" />
            )}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleLoadStudents}
          disabled={levelsOptions.length === 0 ? true : false}
        >
          Load Students
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PreviousSession;
