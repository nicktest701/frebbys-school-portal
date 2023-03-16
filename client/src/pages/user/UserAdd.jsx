import { LoadingButton } from "@mui/lab";
import Autocomplete from "@mui/material/Autocomplete";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik } from "formik";
import moment from "moment";
import React, { useContext, useState } from "react";
import { postUser } from "../../api/userAPI";
import CustomDatePicker from "../../components/inputs/CustomDatePicker";
import CustomFormControl from "../../components/inputs/CustomFormControl";
import { userInitialValues } from "../../config/initialValues";
import { userValidationSchema } from "../../config/validationSchema";
import {
  alertError,
  alertSuccess,
} from "../../context/actions/globalAlertActions";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";
import { NATIONALITY } from "../../mockup/data/nationality";
import { TOWNS } from "../../mockup/data/towns";

function UserAdd({ open, setOpen }) {
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const queryClient = useQueryClient();

  //states
  const [profileImg, setProfieImg] = useState(null);
  const [dob, setDob] = useState(null);
  const [initValues] = useState(userInitialValues);

  //Post teacher
  const { mutateAsync } = useMutation(postUser);
  const onSubmit = (values, options) => {
    values.dateofbirth = moment(dob).format("L");
    // console.log(values);

    mutateAsync(values, {
      onSettled: () => {
        queryClient.invalidateQueries(["users"]);
        options.setSubmitting(false);
      },
      onSuccess: (data) => {
        schoolSessionDispatch(alertSuccess(data));
        options.resetForm();
        setProfieImg(null);
        setOpen(false);
      },
      onError: (error) => {
        schoolSessionDispatch(alertError(error));
      },
    });
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
      <DialogTitle>New User</DialogTitle>
      <Formik
        initialValues={initValues}
        onSubmit={onSubmit}
        enableReinitialize={true}
        validationSchema={userValidationSchema}
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
                  label="Fullname"
                  type="text"
                  fullWidth
                  size="small"
                  value={values.fullname}
                  onChange={handleChange("fullname")}
                  error={Boolean(touched.fullname && errors.fullname)}
                  helperText={touched.fullname && errors.fullname}
                />
                <TextField
                  label="Username"
                  type="text"
                  fullWidth
                  size="small"
                  value={values.username}
                  onChange={handleChange("username")}
                  error={Boolean(touched.username && errors.username)}
                  helperText={touched.username && errors.username}
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
                <TextField
                  label="Role"
                  select
                  fullWidth
                  size="small"
                  value={values.role}
                  onChange={handleChange("role")}
                  error={Boolean(touched.role && errors.role)}
                  helperText={touched.role && errors.role}
                >
                  <MenuItem value="administrator">Administrator</MenuItem>
                  <MenuItem value="director">Director</MenuItem>
                  <MenuItem value="secretary">Secretary</MenuItem>
                  <MenuItem value="coordinator">Exams Coordinator</MenuItem>
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
                      error={Boolean(touched.nationality && errors.nationality)}
                      helperText={touched.nationality && errors.nationality}
                    />
                  )}
                />
              </CustomFormControl>
              <CustomFormControl>
                <TextField
                  type="password"
                  label="Password"
                  fullWidth
                  size="small"
                  value={values.password}
                  onChange={handleChange("password")}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
                <TextField
                  type="password"
                  label="Confirm Password"
                  fullWidth
                  size="small"
                  value={values.confirmPassword}
                  onChange={handleChange("confirmPassword")}
                  error={Boolean(
                    touched.confirmPassword && errors.confirmPassword
                  )}
                  helperText={touched.confirmPassword && errors.confirmPassword}
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
                  onClick={() => setOpen(false)}
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
    </Dialog>
  );
}

export default UserAdd;
