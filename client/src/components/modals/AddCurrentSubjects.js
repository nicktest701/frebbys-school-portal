import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Autocomplete,
  TextField,
  List,
  Typography,
  Divider,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import _ from "lodash";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";
import { SUBJECT_OPTIONS } from "../../mockup/columns/sessionColumns";
import SubjectItem from "../list/SubjectItem";
import { addSubjectsToLevel, getSubjectsForLevel } from "../../api/levelAPI";

const AddCurrentSubjects = ({ open, setOpen }) => {
  const queryClient = useQueryClient();
  const {
    schoolSessionState: { currentLevel },
    schoolSessionDispatch,
  } = useContext(SchoolSessionContext);

  const [subject, setSubject] = useState("");

  const [subjectList, setSubjectList] = useState([]);

  useQuery(
    ["subjects", currentLevel._id],
    () => getSubjectsForLevel(currentLevel._id),
    {
      enabled: !!currentLevel._id,
      onSuccess: (currentSubject) => {
        // console.log(currentSubject);
        setSubjectList(currentSubject.subjects);
      },
    }
  );

  //Add Subjects to subject list
  const handleAddSubject = () => {
    if (subject === "") {
      return;
    }
    setSubjectList((prev) => {
      const newSubjects =
        prev !== undefined ? _.uniq([...prev, subject]) : [subject];

      return newSubjects;
    });

    setSubject("");
  };

  //Remove subject from class
  const handleRemoveSubject = (searchSubject) => {
    setSubjectList((prev) => {
      const filteredSubjects = prev.filter(
        (subject) => subject !== searchSubject
      );

      return filteredSubjects;
    });
  };

  const { mutateAsync } = useMutation(addSubjectsToLevel);

  //Save subjects to db
  const handleSaveSubjects = () => {
    const values = {
      levelId: currentLevel._id,
      subjects: subjectList,
    };

    mutateAsync(values, {
      onSettled: () => {
        queryClient.invalidateQueries(["subjects"]);
      },
      onSuccess: (data) => {
        schoolSessionDispatch({
          type: "showAlert",
          payload: {
            severity: "info",
            message: data,
          },
        });
      },
      onError: (error) => {
        schoolSessionDispatch({
          type: "showAlert",
          payload: {
            severity: "error",
            message: error,
          },
        });
      },
    });
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
      <DialogTitle>Current Subjects</DialogTitle>

      <DialogContent>
        <Stack spacing={2} paddingY={2}>
          <Typography variant="h5" sx={{ textAlign: "right" }}>
            {currentLevel.type}
          </Typography>
          <Divider />
          <Stack direction="row" spacing={2} alignItems="center">
            <Autocomplete
              // multiple={true}
              freeSolo
              fullWidth
              options={SUBJECT_OPTIONS}
              getOptionLabel={(option) => option || ""}
              defaultValue={SUBJECT_OPTIONS[0]}
              value={subject}
              onChange={(e, value) => setSubject(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Subject"
                  size="small"
                  onChange={(e) => setSubject(e.target.value)}
                />
              )}
            />
            <Button variant="contained" size="small" onClick={handleAddSubject}>
              Add
            </Button>
          </Stack>
          <Typography>Current Subjects</Typography>
          <List sx={{ maxHeight: 400 }}>
            {subjectList?.map((subject) => {
              return (
                <SubjectItem
                  key={subject}
                  subject={subject}
                  removeSubject={handleRemoveSubject}
                />
              );
            })}
          </List>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ padding: 2 }}>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <LoadingButton variant="contained" onClick={handleSaveSubjects}>
          Save Changes
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddCurrentSubjects;
