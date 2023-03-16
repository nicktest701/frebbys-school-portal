import React, { useContext, useState } from "react";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import { assignTeacherLevel } from "../../api/currentLevelDetailAPI";
import { currentLevelValidationSchema } from "../../config/validationSchema";
import {
  alertError,
  alertSuccess,
} from "../../context/actions/globalAlertActions";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";
import useLevel from "../../components/hooks/useLevel";

const TeacherAssignLevel = ({ open, setOpen, teacher }) => {
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const queryClient = useQueryClient();

  const [currentLevel, setCurrentLevel] = useState({
    _id: "",
    type: "",
  });

  const { levelsOption, levelLoading } = useLevel();

  const { mutateAsync } = useMutation(assignTeacherLevel);
  const onSubmit = (values, options) => {
    console.log(values);
    mutateAsync(values, {
      onSettled: () => {
        queryClient.invalidateQueries(["teacher-level"]);
        options.setSubmitting(false);
      },
      onSuccess: (data) => {
        schoolSessionDispatch(alertSuccess(data));
        setOpen(false);
      },
      onError: (error) => {
        schoolSessionDispatch(alertError(error));
      },
    });
  };

  return (
    <Dialog open={open} maxWidth="xs" fullWidth>
      <DialogTitle>Assign New Level</DialogTitle>

      <Formik
        initialValues={{ ...currentLevel, teacher: teacher }}
        validationSchema={currentLevelValidationSchema}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {({ errors, touched, isSubmitting, handleSubmit }) => {
          return (
            <>
              <DialogContent>
                <Autocomplete
                  size="small"
                  options={levelsOption}
                  loading={levelLoading}
                  loadingText="Loading levels.Please wait..."
                  getOptionLabel={(option) => option.type || ""}
                  isOptionEqualToValue={(option, value) =>
                    value._id === undefined ||
                    value._id === "" ||
                    value._id === option._id
                  }
                  value={currentLevel}
                  onChange={(e, value) => setCurrentLevel(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select a level"
                      error={Boolean(touched.type && errors.type)}
                      helperText={touched.type && errors.type}
                    />
                  )}
                  sx={{ marginY: 2 }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <LoadingButton
                  loading={isSubmitting}
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Assign Level
                </LoadingButton>
              </DialogActions>
            </>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default React.memo(TeacherAssignLevel);
