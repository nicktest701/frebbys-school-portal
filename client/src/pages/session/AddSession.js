import React, { useContext, useState } from "react";

import {
  Stack,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Divider,
  FormLabel,
} from "@mui/material";
import moment from "moment";
import { Formik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import LoadingButton from "@mui/lab/LoadingButton";
import { postTerm } from "../../api/termAPI";
import { sessionValidationSchema } from "../../config/validationSchema";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";
import {
  alertError,
  alertSuccess,
} from "../../context/actions/globalAlertActions";
import { sessionInitialValues } from "../../config/initialValues";
import { SCHOOL_TERMS } from "../../mockup/columns/sessionColumns";
import Transition from "../../components/animations/Transition";
import CustomDatePicker from "../../components/inputs/CustomDatePicker";
import CustomYearPicker from "../../components/inputs/CustomYearPicker";
const AddSession = () => {
  const queryClient = useQueryClient();

  const { schoolSessionState, schoolSessionDispatch } =
    useContext(SchoolSessionContext);

  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());

  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");

  //ADD New Session
  const { mutateAsync } = useMutation(postTerm);

  const onSubmit = (values, options) => {
    values.academicYear = `${startYear}/${endYear}`;

    mutateAsync(values, {
      onSettled: () => {
        options.setSubmitting(false);
        queryClient.invalidateQueries(["terms"]);
      },
      onSuccess: (data) => {
        schoolSessionDispatch(alertSuccess(data));
        handleCloseDialog();
      },
      onError: (error) => {
        schoolSessionDispatch(alertError(error));
      },
    });
  };

  function handleCloseDialog() {
    schoolSessionDispatch({ type: "displayAddSession", payload: false });
  }
  return (
    <Dialog
      open={schoolSessionState.displayAddSession}
      fullWidth
      maxWidth="xs"
      TransitionComponent={Transition}
    >
      <DialogTitle>Add Session</DialogTitle>
      <Formik
        initialValues={{
          ...sessionInitialValues,
          from: startDate.format("l"),
          to: endDate.format("l"),
        }}
        onSubmit={onSubmit}
        validationSchema={sessionValidationSchema}
        enableReinitialize={true}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => {
          return (
            <>
              <DialogContent>
                <Stack spacing={2} paddingY={2}>
                  <FormLabel sx={{ fontSize: 13 }}>Academic Year</FormLabel>
                  <Stack direction="row" columnGap={2}>
                    <CustomYearPicker
                      label="From"
                      year={startYear}
                      setYear={setStartYear}
                    />
                    <CustomYearPicker
                      label="To"
                      year={endYear}
                      setYear={setEndYear}
                    />
                  </Stack>
                  <CustomDatePicker
                    label="Start of Academic Term"
                    date={startDate}
                    setDate={setStartDate}
                    touched={touched.from}
                    error={errors.from}
                  />
                  <CustomDatePicker
                    label="End of Academic Term"
                    date={endDate}
                    setDate={setEndDate}
                    touched={touched.to}
                    error={errors.to}
                  />

                  <TextField
                    select
                    label="Term/Semester"
                    size="small"
                    value={values.term}
                    onChange={handleChange("term")}
                    error={Boolean(touched.term && errors.term)}
                    helperText={touched.term && errors.term}
                  >
                    {SCHOOL_TERMS.map((term) => (
                      <MenuItem key={term} value={term}>
                        {term}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Divider />
                </Stack>
              </DialogContent>
              <DialogActions sx={{ padding: 2 }}>
                <Button onClick={handleCloseDialog}>Cancel</Button>
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

export default AddSession;
