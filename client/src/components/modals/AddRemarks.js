import { LoadingButton } from "@mui/lab";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik } from "formik";
import React from "react";
import { postExamsRemarks } from "../../api/ExaminationAPI";
import { CONDUCT, INTEREST, TEACHERSREMARKS } from "../../config/remarks";

function AddRemarks({ open, setOpen, id }) {
  const queryClient = useQueryClient();

  const initialValues = {
    conduct: "",
    interest: "",
    teachersComments: "",
    headteachersComments: "",
  };

  const { mutateAsync } = useMutation(postExamsRemarks);
  const onSubmit = (values) => {
    const remarks = {
      _id: id,
      comments: values,
    };
    mutateAsync(remarks, {
      onSuccess: (remarks) => {
        alert("Success");
        queryClient.invalidateQueries(["student-records"]);
        queryClient.invalidateQueries(["exams-scores"]);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values, setFieldValue, errors, touched, handleSubmit }) => {
        return (
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            maxWidth="sm"
            fullWidth
            className="add-remark"
          >
            <DialogTitle>Remarks</DialogTitle>
            <DialogContent>
              <Stack spacing={2} paddingY={2}>
                <Autocomplete
                  freeSolo
                  options={INTEREST}
                  getOptionLabel={(option) => option || ""}
                  value={values.interest}
                  onChange={(e, value) => setFieldValue("interest", value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Interest"
                      size="small"
                      error={Boolean(errors.interest)}
                      helperText={touched.interest && errors.interest}
                    />
                  )}
                />
                <Autocomplete
                  freeSolo
                  options={CONDUCT}
                  getOptionLabel={(option) => option || ""}
                  value={values.conduct}
                  onChange={(e, value) => setFieldValue("conduct", value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Conduct"
                      size="small"
                      error={Boolean(errors.conduct)}
                      helperText={touched.conduct && errors.conduct}
                    />
                  )}
                />
                <Autocomplete
                  freeSolo
                  options={TEACHERSREMARKS}
                  getOptionLabel={(option) => option || ""}
                  value={values.teachersComments}
                  onChange={(e, value) =>
                    setFieldValue("teachersComments", value)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Teacher's Comments"
                      size="small"
                      error={Boolean(errors.teachersComments)}
                      helperText={
                        touched.teachersComments && errors.teachersComments
                      }
                    />
                  )}
                />
                <Autocomplete
                  freeSolo
                  options={TEACHERSREMARKS}
                  getOptionLabel={(option) => option || ""}
                  value={values.headerTeacherComments}
                  onChange={(e, value) =>
                    setFieldValue("headteachersComments", value)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Headteacher's Comments"
                      size="small"
                      error={Boolean(errors.headteachersComments)}
                      helperText={
                        touched.headteachersComments &&
                        errors.headteachersComments
                      }
                    />
                  )}
                />
              </Stack>
            </DialogContent>
            <DialogActions sx={{ padding: 2 }}>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <LoadingButton variant="contained" onClick={handleSubmit}>
                Save Changes
              </LoadingButton>
            </DialogActions>
          </Dialog>
        );
      }}
    </Formik>
  );
}

export default AddRemarks;
