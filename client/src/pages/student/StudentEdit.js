import React, { useContext, useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormLabel,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik } from "formik";
import { putStudent } from "../../api/studentAPI";
import CustomFormControl from "../../components/inputs/CustomFormControl";
import { studentEditValidationSchema } from "../../config/validationSchema";
import { StudentContext } from "../../context/providers/StudentProvider";
import Edit from "@mui/icons-material/Edit";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";
import {
  alertError,
  alertSuccess,
} from "../../context/actions/globalAlertActions";

import { uploadProfileImage } from "../../api/sessionAPI";
import CustomDatePicker from "../../components/inputs/CustomDatePicker";
import moment from "moment";
import { NATIONALITY } from "../../mockup/data/nationality";
import { TOWNS } from "../../mockup/data/towns";

const StudentEdit = () => {
  const queryClient = useQueryClient();

  const [dob, setDob] = useState(null);

  const [profileImage, setProfileImage] = useState(null);
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const {
    studentState: { editStudentData },
    studentDispatch,
  } = useContext(StudentContext);

  const student = editStudentData?.data;

  useEffect(() => {
    setDob(new Date(student?.dateofbirth));
    setProfileImage(
      `${process.env.REACT_APP_BASE_NET_LOCAL}/images/students/${student?.profile}`
    );
  }, [student]);

  //CLOSE Edit Student
  const handleClose = () => {
    studentDispatch({
      type: "editStudent",
      payload: {
        open: false,
        data: {},
      },
    });
  };

  //Put student
  const { mutateAsync } = useMutation(putStudent);
  const onSubmit = (values, options) => {
    values.dateofbirth = moment(dob).format("L");
    // console.log(values);
    delete values.profile;

    mutateAsync(values, {
      onSettled: () => {
        queryClient.invalidateQueries(["students"]);
        queryClient.invalidateQueries(["student-by-id"]);
        queryClient.invalidateQueries(["sll-students"]);
        options.setSubmitting(false);
      },
      onSuccess: (data) => {
        schoolSessionDispatch(alertSuccess(data));
        handleClose();
      },
      onError: (error) => {
        schoolSessionDispatch(alertError(error));
      },
    });
  };

  const uploadProfile = async (e) => {
    const profile = e.target?.files[0];
    const info = {
      _id: student?._id,
      profile,
      type: "students",
    };

    try {
      const data = await uploadProfileImage(info);
      schoolSessionDispatch(alertSuccess(data));
      setProfileImage(URL.createObjectURL(profile));
    } catch (error) {
      schoolSessionDispatch(alertError(error));
    }
    queryClient.invalidateQueries(["students"]);
    queryClient.invalidateQueries(["student-by-id"]);
  };

  return (
    <Dialog open={editStudentData.open} maxWidth="md" fullWidth>
      <DialogTitle>Edit Student Information</DialogTitle>

      <Divider />
      <Formik
        initialValues={student}
        onSubmit={onSubmit}
        enableReinitialize={true}
        validationSchema={studentEditValidationSchema}
      >
        {({
          values,
          errors,
          touched,
          setFieldValue,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => {
          return (
            <>
              <DialogContent sx={{ display: "flex", justifyContent: "center" }}>
                <Stack padding={2} spacing={1}>
                  <Stack sx={{ position: "relative" }}>
                    <Avatar
                      srcSet={profileImage}
                      sx={{ width: 80, height: 80, alignSelf: "center" }}
                    />
                    <FormLabel
                      htmlFor="profile"
                      sx={{
                        position: "absolute",
                        left: 20,
                        right: 0,
                        bottom: -20,
                        marginInline: "auto",
                        textAlign: "center",
                        backgroundColor: "pink",
                        height: 30,
                        width: 30,
                      }}
                    >
                      <Edit />
                    </FormLabel>
                    <input
                      type="file"
                      accept=".png, .jpg ,.webp"
                      name="profile"
                      id="profile"
                      onChange={(e) => uploadProfile(e)}
                      hidden
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
                      value={values.firstname || ""}
                      onChange={handleChange("firstname")}
                      error={Boolean(touched.firstname && errors.firstname)}
                      helperText={touched.firstname && errors.firstname}
                    />
                    <TextField
                      label="Surname"
                      fullWidth
                      size="small"
                      value={values.surname || ""}
                      onChange={handleChange("surname")}
                      error={Boolean(touched.surname && errors.surname)}
                      helperText={touched.surname && errors.surname}
                    />
                    <TextField
                      label="Othername"
                      fullWidth
                      size="small"
                      value={values.othername || ""}
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
                      touched={Boolean(
                        touched.dateofbirth && errors.dateofbirth
                      )}
                      error={touched.dateofbirth && errors.dateofbirth}
                    />
                    <TextField
                      label="Gender"
                      select
                      fullWidth
                      size="small"
                      value={values.gender || ""}
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
                      value={values.email || ""}
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
                      value={values.phonenumber || ""}
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
                    value={values.address || ""}
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
                      value={values.residence || ""}
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
                      value={values.nationality || ""}
                      onChange={(e, value) =>
                        setFieldValue("nationality", value)
                      }
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
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <LoadingButton
                  loading={isSubmitting}
                  variant="contained"
                  color="primary"
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

StudentEdit.propTypes = {};

export default React.memo(StudentEdit);
