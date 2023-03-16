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
} from "@mui/material";
import { Formik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { quickMessageInitialValues } from "../../config/initialValues";
import { postMessage } from "../../api/messageAPI";

const SMSQuick = () => {
  const [radioValue, setRadioValue] = useState("sms");

  const data = useMemo(
    () => quickMessageInitialValues(radioValue),
    [radioValue]
  );

  const { mutateAsync } = useMutation(postMessage);
  const onSubmit = (values, options) => {
    values.rate = "quick";
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
      initialValues={data.init}
      onSubmit={onSubmit}
      validationSchema={data.val}
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
              {(radioValue === "sms" || radioValue === "both") && (
                <TextField
                  label="Recipient's Phone No"
                  required
                  inputMode="tel"
                  size="small"
                  type="tel"
                  fullWidth
                  value={values.phonenumber || ""}
                  onChange={handleChange("phonenumber")}
                  hidden={radioValue === "email" ? true : false}
                  error={Boolean(touched.phonenumber && errors.phonenumber)}
                  helperText={touched.phonenumber && errors.phonenumber}
                />
              )}

              {(radioValue === "email" || radioValue === "both") && (
                <TextField
                  label="Recipient's Email Address"
                  inputMode="email"
                  type="email"
                  size="small"
                  required
                  fullWidth
                  hidden={radioValue === "sms" ? true : false}
                  value={values.email || ""}
                  onChange={handleChange("email")}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
              )}

              <TextField
                label="Message Title"
                required
                fullWidth
                size="small"
                value={values.title || ""}
                onChange={handleChange("title")}
                error={Boolean(touched.title && errors.title)}
                helperText={touched.title && errors.title}
              />

              <TextField
                sx={{ textAlign: "left" }}
                label="Message"
                required
                size="small"
                multiline
                rows={4}
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

export default SMSQuick;
