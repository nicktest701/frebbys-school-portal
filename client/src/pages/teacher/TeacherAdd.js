import React, { useContext, useState } from "react";
import {
  Avatar,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
  FormLabel,
  MenuItem,
  Button,
  Autocomplete,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik } from "formik";
import CustomFormControl from "../../components/inputs/CustomFormControl";
import { teacherInitialValues } from "../../config/initialValues";
import { teacherValidationSchema } from "../../config/validationSchema";
import { postTeacher } from "../../api/teacherAPI";
import {
  alertError,
  alertSuccess,
} from "../../context/actions/globalAlertActions";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";
import CustomDatePicker from "../../components/inputs/CustomDatePicker";
import moment from "moment";
import { TOWNS } from "../../mockup/data/towns";
import { NATIONALITY } from "../../mockup/data/nationality";

const TeacherAdd = ({ setTab }) => {
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const queryClient = useQueryClient();

  //states
  const [profileImg, setProfieImg] = useState(null);
  const [dob, setDob] = useState(null);

  const [initValues] = useState(teacherInitialValues);

  //Post teacher
  const { mutateAsync } = useMutation(postTeacher);
  const onSubmit = (values, options) => {
    // console.log(values);
    values.dateofbirth = moment(dob).format("L");
    mutateAsync(values, {
      onSettled: () => {
        queryClient.invalidateQueries(["teachers"]);
        options.setSubmitting(false);
      },
      onSuccess: (data) => {
        schoolSessionDispatch(alertSuccess(data));
        options.resetForm();
        setProfieImg(null);
        setTab("1");
      },
      onError: (error) => {
        schoolSessionDispatch(alertError(error));
      },
    });
  };

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          paddingY: 2,
          backgroundColor: "#fff",
          borderRadius: 1,
        }}
      >
        <Stack justifyContent="flex-end">
          <Typography variant="h4" color="primary.main">
            New Teacher
          </Typography>
        </Stack>
        <Divider />
        <Formik
          initialValues={initValues}
          onSubmit={onSubmit}
          enableReinitialize={true}
          validationSchema={teacherValidationSchema}
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
                <Stack
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                  paddingY={1}
                >
                  <Avatar src={profileImg} sx={{ width: 80, height: 80 }} />
                  <FormLabel
                    htmlFor="profile"
                    sx={{
                      padding: 1,
                      fontSize: 12,
                      border: "1px solid black",
                      borderRadius: 1,
                      cursor: "pointer",
                      "&:hover": {
                        bgcolor: "primary.main",
                        color: "primary.contrastText",
                      },
                    }}
                  >
                    Attach Photo
                  </FormLabel>
                  <input
                    type="file"
                    id="profile"
                    name="profile"
                    accept=".png,.jpeg,.jpg,.webp"
                    hidden
                    onChange={(e) => {
                      setFieldValue("profile", e.target.files[0]);
                      setProfieImg(URL.createObjectURL(e.target.files[0]));
                    }}
                  />
                </Stack>
                <Typography
                  variant="body2"
                  color="primary.main"
                  sx={{ fontWeight: "bold" }}
                >
                  Personal information
                </Typography>
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
                  <TextField
                    label="Othername"
                    fullWidth
                    size="small"
                    value={values.othername}
                    onChange={handleChange("othername")}
                    error={Boolean(touched.othername && errors.othername)}
                    helperText={touched.othername && errors.othername}
                  />
                </CustomFormControl>
                <CustomFormControl>
                  <CustomDatePicker
                    label="Date of Birth"
                    date={dob}
                    setDate={setDob}
                    disableFuture={true}
                    touched={Boolean(touched.dateofbirth && errors.dateofbirth)}
                    error={touched.dateofbirth && errors.dateofbirth}
                  />

                  {/* <TextField
                    label="Date of birth"
                    type="text"
                    fullWidth
                    size="small"
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    value={values.dateofbirth}
                    onChange={handleChange("dateofbirth")}
                    error={Boolean(touched.dateofbirth && errors.dateofbirth)}
                    helperText={touched.dateofbirth && errors.dateofbirth}
                  /> */}
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
                  label="Address"
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
                    Save
                  </LoadingButton>
                </Stack>
              </Stack>
            );
          }}
        </Formik>
      </Container>
      {/* </Scrollbars> */}
    </>
  );
};

TeacherAdd.propTypes = {};

export default TeacherAdd;
