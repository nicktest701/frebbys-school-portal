import React, { useContext, useEffect, useState } from "react";
import {
  Stack,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  TextField,
  Typography,
  Divider,
  FormLabel,
} from "@mui/material";
import { Formik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoadingButton } from "@mui/lab";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";
import { putTerm } from "../../api/termAPI";
import {
  alertSuccess,
  alertError,
} from "../../context/actions/globalAlertActions";
import Transition from "../../components/animations/Transition";
import moment from "moment";
import CustomDatePicker from "../../components/inputs/CustomDatePicker";
import CustomYearPicker from "../../components/inputs/CustomYearPicker";
const EditSession = ({ open, setOpen }) => {
  const {
    schoolSessionState: { sessionEditData },
    schoolSessionDispatch,
  } = useContext(SchoolSessionContext);

  const queryClient = useQueryClient();

  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [vacationDate, setVacationDate] = useState(null);
  const [reOpeningDate, setReOpeningDate] = useState(null);

  useEffect(() => {
    setFrom(moment(new Date(sessionEditData.from)));
    setTo(moment(new Date(sessionEditData.to)));
    setVacationDate(moment(new Date(sessionEditData.vacationDate)));
    setReOpeningDate(moment(new Date(sessionEditData.reOpeningDate)));
  }, [sessionEditData]);
  //initial states
  const initialValues = {
    id: sessionEditData.termId,
    from,
    to,
    vacationDate,
    reOpeningDate,
    academicYear: sessionEditData.academicYear,
    term: sessionEditData.term,
    session: sessionEditData.sessionId,
  };

  const { mutateAsync } = useMutation(putTerm);

  const onSubmit = (values, options) => {
    console.log(values);
    mutateAsync(values, {
      onSettled: () => {
        options.setSubmitting(false);
        queryClient.invalidateQueries(["terms"]);
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
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      fullWidth
      maxWidth="xs"
      TransitionComponent={Transition}
    >
      <DialogTitle>Edit Session </DialogTitle>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {({
          values,
          touched,
          errors,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => {
          return (
            <>
              <DialogContent>
                <Stack spacing={2} paddingY={2}>
                  <TextField
                    label="Academic Year"
                    InputProps={{ readOnly: true }}
                    value={values.academicYear}
                    size="small"
                  />
                  <CustomDatePicker
                    label="Start of Academic Term"
                    date={from}
                    setDate={setFrom}
                    touched={touched.from}
                    error={errors.from}
                    readOnly={true}
                  />
                  <CustomDatePicker
                    label="End of Academic Term"
                    date={to}
                    setDate={setTo}
                    touched={touched.to}
                    error={errors.to}
                    readOnly={true}
                  />

                  <TextField
                    label="Term/Semester"
                    size="small"
                    value={values.term}
                    onChange={handleChange("term")}
                    InputProps={{
                      readOnly: true,
                    }}
                  />

                  <Typography fontSize={13}>Vacation</Typography>
                  <CustomDatePicker
                    label="Vacation Date"
                    date={vacationDate}
                    setDate={setVacationDate}

                    // touched={touched.to}
                    // error={errors.to}
                  />

                  <CustomDatePicker
                    label="Next Term Begins"
                    date={reOpeningDate}
                    setDate={setReOpeningDate}
                    // touched={touched.to}
                    // error={errors.to}
                  />
                  <Divider />
                </Stack>
              </DialogContent>
              <DialogActions sx={{ padding: 2 }}>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <LoadingButton
                  loading={isSubmitting}
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Save Changes
                </LoadingButton>
              </DialogActions>
            </>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default EditSession;

/* <TextField
                    type={isMobile() ? "date" : "text"}
                    label="Vacation Date"
                    size="small"
                    onFocus={(e) =>
                      !isMobile() && (e.currentTarget.type = "date")
                    }
                    onBlur={(e) =>
                      !isMobile() && (e.currentTarget.type = "text")
                    }
                    value={values.vacationDate}
                    onChange={handleChange("vacationDate")}
                  /> */
/* <TextField
                    type={isMobile() ? "date" : "text"}
                    label="Next Term Begins"
                    size="small"
                    onFocus={(e) =>
                      !isMobile() && (e.currentTarget.type = "date")
                    }
                    onBlur={(e) =>
                      !isMobile() && (e.currentTarget.type = "text")
                    }
                    value={values.reOpeningDate}
                    onChange={handleChange("reOpeningDate")}
                  /> */
/* <TextField
                    type={isMobile() ? "date" : "text"}
                    label="Vacation Date"
                    size="small"
                    onFocus={(e) =>
                      !isMobile() && (e.currentTarget.type = "date")
                    }
                    onBlur={(e) =>
                      !isMobile() && (e.currentTarget.type = "text")
                    }
                    value={values.vacationDate}
                    onChange={handleChange("vacationDate")}
                  /> */
/* <TextField
                    type={isMobile() ? "date" : "text"}
                    label="Next Term Begins"
                    size="small"
                    onFocus={(e) =>
                      !isMobile() && (e.currentTarget.type = "date")
                    }
                    onBlur={(e) =>
                      !isMobile() && (e.currentTarget.type = "text")
                    }
                    value={values.reOpeningDate}
                    onChange={handleChange("reOpeningDate")}
                  /> */
