import React, { useContext } from "react";
import {
  Container,
  Button,
  Stack,
  Typography,
  Divider,
  TextField,
  MenuItem,
  IconButton,
  Autocomplete,
} from "@mui/material";
import _ from "lodash";
import { ArrowBackRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import CustomFormControl from "../../../components/inputs/CustomFormControl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik } from "formik";
import { parentInitialValues } from "../../../config/initialValues";
import { postStudent } from "../../../api/studentAPI";
import { StudentContext } from "../../../context/providers/StudentProvider";
import { parentValidationSchema } from "../../../config/validationSchema";
import { SchoolSessionContext } from "../../../context/providers/SchoolSessionProvider";
import {
  alertError,
  alertSuccess,
} from "../../../context/actions/globalAlertActions";
import { NATIONALITY } from "../../../mockup/data/nationality";
import { TOWNS } from "../../../mockup/data/towns";

const ParentInfo = ({ setTab }) => {
  const student = JSON.parse(localStorage.getItem("@student"));

  const { studentState } = useContext(StudentContext);
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation(postStudent);

  const onSubmit = (values, options) => {
    const info = {
      student: !_.isEmpty(studentState?.newStudent)
        ? studentState?.newStudent
        : student,
      parent: values,
    };

    mutateAsync(info, {
      onSettled: () => {
        queryClient.invalidateQueries(["students-by-current-level"]);
        queryClient.invalidateQueries(["all-students"]);
        options.setSubmitting(false);
      },
      onSuccess: (data) => {
        localStorage.removeItem("@student");
        schoolSessionDispatch(alertSuccess(data));
        setTab("1");
      },
      onError: (error) => {
        schoolSessionDispatch(alertError(error));
      },
    });
  };

  return (
    <>
      <IconButton onClick={() => setTab("1")}>
        <ArrowBackRounded />
      </IconButton>
      <Container maxWidth="md">
        <Stack justifyContent="flex-end">
          <Typography variant="h4">Parent/Guardian Information</Typography>
        </Stack>
        <Divider />

        <Formik
          initialValues={parentInitialValues}
          onSubmit={onSubmit}
          enableReinitialize={true}
          validationSchema={parentValidationSchema}
        >
          {({
            values,
            errors,
            touched,
            setFieldValue,
            handleChange,
            handleSubmit,
            handleReset,
            isSubmitting,
          }) => {
            return (
              <Stack padding={2} spacing={1}>
                <CustomFormControl>
                  <TextField
                    label="Firstname"
                    type="text"
                    fullWidth
                    size="small"
                    value={values.firstname}
                    onChange={handleChange("firstname")}
                    error={Boolean(touched.firstname && errors.firstname)}
                    helperText={touched.firstname && errors.firstname}
                  />
                  <TextField
                    label="Surname"
                    fullWidth
                    size="small"
                    value={values.surname}
                    onChange={handleChange("surname")}
                    error={Boolean(touched.surname && errors.surname)}
                    helperText={touched.surname && errors.surname}
                  />
                </CustomFormControl>
                <CustomFormControl>
                  <TextField
                    label="Gender"
                    select
                    fullWidth
                    size="small"
                    value={values.gender}
                    onChange={handleChange("gender")}
                    error={Boolean(touched.gender && errors.gender)}
                    helperText={touched.gender && errors.gender}
                  >
                    <MenuItem value="male">male</MenuItem>
                    <MenuItem value="female">female</MenuItem>
                  </TextField>
                </CustomFormControl>
                <CustomFormControl>
                  <TextField
                    label="Email"
                    fullWidth
                    size="small"
                    row={3}
                    maxRows={3}
                    value={values.email}
                    onChange={handleChange("email")}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <TextField
                    label="Telephone No."
                    inputMode="tel"
                    type="tel"
                    fullWidth
                    size="small"
                    value={values.phonenumber}
                    onChange={handleChange("phonenumber")}
                    error={Boolean(touched.phonenumber && errors.phonenumber)}
                    helperText={touched.phonenumber && errors.phonenumber}
                  />
                </CustomFormControl>
                <TextField
                  label="Residence Address"
                  fullWidth
                  size="small"
                  row={3}
                  maxRows={3}
                  value={values.address}
                  onChange={handleChange("address")}
                  error={Boolean(touched.address && errors.address)}
                  helperText={touched.address && errors.address}
                />

                <CustomFormControl>
                  <Autocomplete
                    freeSolo
                    fullWidth
                    size="small"
                    options={TOWNS}
                    loadingText="Please wait...."
                    noOptionsText="No Town available"
                    getOptionLabel={(option) => option || ""}
                    value={values.residence}
                    onChange={(e, value) => setFieldValue("residence", value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Residence"
                        fullWidth
                        size="small"
                        error={Boolean(touched.residence && errors.residence)}
                        helperText={touched.residence && errors.residence}
                      />
                    )}
                  />

                  <Autocomplete
                    freeSolo
                    fullWidth
                    size="small"
                    loadingText="Please wait...."
                    options={NATIONALITY}
                    noOptionsText="No Nationality available"
                    getOptionLabel={(option) => option || ""}
                    value={values.nationality}
                    onChange={(e, value) => setFieldValue("nationality", value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Nationality"
                        fullWidth
                        size="small"
                        error={Boolean(
                          touched.nationality && errors.nationality
                        )}
                        helperText={touched.nationality && errors.nationality}
                      />
                    )}
                  />
                </CustomFormControl>

                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  spacing={2}
                  paddingY={4}
                >
                  <Button
                    sx={{ minWidth: { xs: 100, sm: 150 } }}
                    onClick={handleReset}
                  >
                    Cancel
                  </Button>
                  <LoadingButton
                    loading={isSubmitting}
                    variant="contained"
                    color="primary"
                    sx={{ minWidth: { xs: 100, sm: 150 } }}
                    onClick={handleSubmit}
                  >
                    Save & Continue
                  </LoadingButton>
                </Stack>
              </Stack>
            );
          }}
        </Formik>
      </Container>
    </>
  );
};

export default ParentInfo;
