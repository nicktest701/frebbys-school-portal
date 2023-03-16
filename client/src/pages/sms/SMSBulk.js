import React, { useMemo, useState } from "react";
import { SendRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Container,
  Stack,
  TextField,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  MenuItem,
} from "@mui/material";
import { Formik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { bulkMessageInitialValues } from "../../config/initialValues";
import { postMessage } from "../../api/messageAPI";
import { bulksmsValidationSchema } from "../../config/validationSchema";

const SMSBulk = () => {
  const [radioValue, setRadioValue] = useState("sms");
  const [group, setGroup] = useState("students");

  const { mutateAsync } = useMutation(postMessage);
  const onSubmit = (values, options) => {
    values.rate = "bulk";
    values.group = group;
    values.type = radioValue;

    mutateAsync(values, {
      onSettled: () => {
        options.setSubmitting(false);
      },
      onSuccess: (data) => {
        alert(data);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <Formik
      initialValues={bulkMessageInitialValues}
      onSubmit={onSubmit}
      validationSchema={bulksmsValidationSchema}
      enableReinitialize={true}
    >
      {({
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleSubmit,
      }) => {
        return (
          <Container>
            <FormControl>
              <FormLabel id="message-type">Select type</FormLabel>
              <RadioGroup
                row
                aria-labelledby="message-type"
                name="message-type"
                value={radioValue}
                onChange={(e, value) => setRadioValue(value)}
              >
                <FormControlLabel value="sms" control={<Radio />} label="SMS" />
                <FormControlLabel
                  value="email"
                  control={<Radio />}
                  label="Email"
                />
                <FormControlLabel
                  value="both"
                  control={<Radio />}
                  label="Both"
                />
              </RadioGroup>
            </FormControl>

            <Stack
              spacing={2}
              justifyContent="center"
              alignItems="center"
              paddingY={2}
            >
              <TextField
                label="Select group"
                select
                fullWidth
                value={group}
                size="small"
                onChange={(e) => setGroup(e.target.value)}
              >
                <MenuItem value="students">Students</MenuItem>
                <MenuItem value="parents">Parents</MenuItem>
                <MenuItem value="teachers">Teachers</MenuItem>
              </TextField>

              <TextField
                label="Message Title"
                required
                size="small"
                fullWidth
                value={values.title || ""}
                onChange={handleChange("title")}
                error={Boolean(touched.title && errors.title)}
                helperText={touched.title && errors.title}
              />

              <TextField
                sx={{ textAlign: "left" }}
                label="Message"
                required
                multiline
                rows={4}
                size="small"
                fullWidth
                value={values.message || ""}
                onChange={handleChange("message")}
                error={Boolean(touched.message && errors.message)}
                helperText={touched.message && errors.message}
              />
            </Stack>
            <LoadingButton
              loading={isSubmitting}
              variant="contained"
              onClick={handleSubmit}
              endIcon={<SendRounded />}
            >
              Send Message
            </LoadingButton>
          </Container>
        );
      }}
    </Formik>
  );
};

export default SMSBulk;
