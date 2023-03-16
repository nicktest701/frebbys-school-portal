import React, { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import Input from "@mui/material/Input";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import PublishIcon from "@mui/icons-material/Publish";
import LoadingButton from "@mui/lab/LoadingButton";
import CustomFormControl from "../../../components/inputs/CustomFormControl";
import { Formik } from "formik";
import { studentInitialValues } from "../../../config/initialValues";
import { StudentContext } from "../../../context/providers/StudentProvider";
import { studentValidationSchema } from "../../../config/validationSchema";
import useLevel from "../../../components/hooks/useLevel";
import { SchoolSessionContext } from "../../../context/providers/SchoolSessionProvider";
import { readCSV } from "../../../config/readCSV";
import { readXLSX } from "../../../config/readXLSX";
import PreviousSession from "../PreviousSession";
import { NoteRounded } from "@mui/icons-material";
import CustomDatePicker from "../../../components/inputs/CustomDatePicker";
import moment from "moment";
import { NATIONALITY } from "../../../mockup/data/nationality";
import { TOWNS } from "../../../mockup/data/towns";

const CSV_FILE_TYPE = "text/csv";
const XLSX_FILE_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
const XLS_FILE_TYPE = "application/vnd.ms-excel";

const StudentInfo = ({ setTab, setMsg, msg }) => {
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const { studentDispatch } = useContext(StudentContext);

  const [isLoading, setIsLoading] = useState(false);
  const [openPreviousSession, setOpenPreviousSession] = useState(false);
  const [profileImg, setProfieImg] = useState(null);
  const [initValues, setInitValues] = useState(studentInitialValues);
  const [dob, setDob] = useState(null);
  useEffect(() => {
    const student = JSON.parse(localStorage.getItem("@student"));
    if (student) {
      setInitValues(student);
      return;
    }
  }, []);

  const { levelsOption } = useLevel();

  const onSubmit = (values, options) => {
    values.dateofbirth = moment(dob).format("L");
    // console.log(values);

    try {
      studentDispatch({ type: "addNewStudent", payload: values });
      localStorage.setItem("@student", JSON.stringify(values));

      setTab("2");
      options.setSubmitting(false);
    } catch (error) {
      setMsg({
        severity: "error",
        text: `Could not save student info.Try again!!!.
              In this problem persists,try contacting your administrator!!!`,
      });
    }
    // options.setSubmitting(false);
  };

  //LOAD Students from file excel,csv
  function handleLoadFile(e) {
    setIsLoading(true);
    const files = e.target.files[0];

    try {
      const reader = new FileReader();
      files.type === CSV_FILE_TYPE
        ? reader.readAsBinaryString(files)
        : reader.readAsArrayBuffer(files);

      reader.onload = function (event) {
        let students = [];

        if (files.type === XLSX_FILE_TYPE || files.type === XLS_FILE_TYPE) {
          students = readXLSX(event.target.result);
        }

        if (files.type === CSV_FILE_TYPE) {
          students = readCSV(event.target.result);
        }
        if (students.length !== 0) {
          schoolSessionDispatch({
            type: "openAddStudentFileDialog",
            payload: { data: students, type: "file" },
          });

          setIsLoading(false);
        }
      };
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <>
      <Container maxWidth="md" sx={{ paddingY: 2, position: "relative" }}>
        <Typography variant="h4">Student Infomation</Typography>
        <Divider />
        <Typography sx={{ textAlign: "right", paddingY: 2 }}>
          Import Student
        </Typography>
        <Stack direction="row" justifyContent="flex-end" alignItems="center">
          <ButtonGroup>
            <Button>
              <FormLabel
                htmlFor="studentFile"
                title="Import students"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                  color: "primary.main",
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                <NoteRounded />
                <Typography variant="body2">From file</Typography>

                <Input
                  type="file"
                  id="studentFile"
                  name="studentFile"
                  hidden
                  inputProps={{
                    accept: ".xlsx,.xls,.csv",
                  }}
                  onChange={(event) => handleLoadFile(event)}
                  onClick={(e) => {
                    e.target.value = null;
                    e.currentTarget.value = null;
                  }}
                />
              </FormLabel>
            </Button>
            <Button
              startIcon={<PublishIcon />}
              onClick={() => setOpenPreviousSession(true)}
            >
              From Previous Sessions
            </Button>
          </ButtonGroup>
        </Stack>
        <Formik
          initialValues={initValues}
          onSubmit={onSubmit}
          enableReinitialize={true}
          validationSchema={studentValidationSchema}
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
                  <Avatar src={profileImg} sx={{ width: 60, height: 60 }} />
                  <FormLabel
                    htmlFor="profile"
                    sx={{
                      padding: 1,
                      cursor: "pointer",
                      "&:hover": {
                        bgcolor: "primary.main",
                        color: "primary.contrastText",
                      },
                    }}
                  >
                    Upload Image
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

                <Typography
                  variant="body2"
                  color="primary.main"
                  sx={{ fontWeight: "bold" }}
                >
                  Academic Information
                </Typography>

                <CustomFormControl>
                  <Autocomplete
                    fullWidth
                    size="small"
                    options={levelsOption}
                    noOptionsText="No Level available"
                    getOptionLabel={(option) => option.type || ""}
                    isOptionEqualToValue={(option, value) =>
                      value._id === undefined ||
                      value._id === "" ||
                      value._id === option._id
                    }
                    value={values.level}
                    onChange={(e, value) => setFieldValue("level", value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Current Level"
                        fullWidth
                        size="small"
                        error={Boolean(
                          touched?.level?.type && errors?.level?.type
                        )}
                        helperText={touched?.level?.type && errors?.level?.type}
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
                  <Button onClick={handleReset}>Cancel</Button>
                  <LoadingButton
                    loading={isSubmitting}
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                  >
                    Save & Continue
                  </LoadingButton>
                </Stack>
              </Stack>
            );
          }}
        </Formik>
        <Box
          sx={{
            display: isLoading ? "block" : "none",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: "rgba(255,255,255,0.7)",
          }}
        >
          kjhkjh
        </Box>
      </Container>
      <PreviousSession
        open={openPreviousSession}
        setOpen={setOpenPreviousSession}
      />
    </>
  );
};

StudentInfo.propTypes = {};

export default StudentInfo;

/* <TextField
                    label="Residence"
                    type="text"
                    fullWidth
                    size="small"
                    value={values.residence}
                    onChange={handleChange("residence")}
                    error={Boolean(touched.residence && errors.residence)}
                    helperText={touched.residence && errors.residence}
                  />
                  {/* <TextField
                    label="Nationality"
                    fullWidth
                    size="small"
                    value={values.nationality}
                    onChange={handleChange("nationality")}
                    error={Boolean(touched.nationality && errors.nationality)}
                    helperText={touched.nationality && errors.nationality}
                  /> */
