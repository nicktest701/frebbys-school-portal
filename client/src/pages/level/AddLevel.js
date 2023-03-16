import React, { useContext } from "react";
import {
  Stack,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  TextField,
  Autocomplete,
} from "@mui/material";
import _ from "lodash";
import { Formik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoadingButton } from "@mui/lab";
import {
  LEVEL_OPTIONS,
  LEVEL_TYPE_OPTIONS,
} from "../../mockup/columns/sessionColumns";
import { levelValidationSchema } from "../../config/validationSchema";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";
import {
  alertError,
  alertSuccess,
} from "../../context/actions/globalAlertActions";
import useLevel from "../../components/hooks/useLevel";
import { postLevel } from "../../api/levelAPI";
import { levelInitialValues } from "../../config/initialValues";

const AddLevel = ({ open, setOpen }) => {
  const session = JSON.parse(localStorage.getItem("@school_session"));

  const queryClient = useQueryClient();
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const { levelsOption } = useLevel();

  //ADD New Level
  const { mutateAsync } = useMutation(postLevel);

  const onSubmit = (values, options) => {
    const newType = `${values.level}${values.type}`;
    const isMatch = levelsOption.find(
      ({ type }) => type === newType.toUpperCase()
    );

    if (!_.isEmpty(isMatch)) {
      schoolSessionDispatch(alertError("Level already exists!!!"));
      options.setSubmitting(false);
      return;
    }

    const newLevel = {
      session: session.sessionId,
      term: session.termId,
      level: {
        name: values.level,
        type: values.type,
      },
    };

    // console.log(newLevel);

    mutateAsync(newLevel, {
      onSettled: () => {
        options.setSubmitting(false);
        queryClient.invalidateQueries(["levels"]);
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
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
      <DialogTitle>New Level</DialogTitle>
      <Formik
        initialValues={levelInitialValues}
        onSubmit={onSubmit}
        validationSchema={levelValidationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => {
          return (
            <>
              <DialogContent>
                <Stack spacing={2} paddingY={2}>
                  <Autocomplete
                    freeSolo
                    options={LEVEL_OPTIONS}
                    getOptionLabel={(option) => option || ""}
                    value={values.level}
                    onInputChange={(e, value) => setFieldValue("level", value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Level"
                        size="small"
                        error={Boolean(touched.level && errors.level)}
                        helperText={touched.level && errors.level}
                      />
                    )}
                  />
                  <Autocomplete
                    freeSolo
                    options={LEVEL_TYPE_OPTIONS}
                    getOptionLabel={(option) => option || ""}
                    value={values.type}
                    onInputChange={(e, value) => setFieldValue("type", value)}
                    renderInput={(params) => (
                      <TextField {...params} label="type" size="small" />
                    )}
                  />
                </Stack>
              </DialogContent>
              <DialogActions sx={{ padding: 2 }}>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <LoadingButton
                  loading={isSubmitting}
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Save
                </LoadingButton>
              </DialogActions>
            </>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default AddLevel;
