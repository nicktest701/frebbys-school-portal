import { TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import React from "react";

function CustomDatePicker({
  label,
  date,
  setDate,
  error,
  touched,
  disableFuture,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        value={date}
        onChange={(date) => setDate(date)}
        // InputProps={{
        //   readOnly: readOnly || false,
        // }}
    
        inputFormat=" Do MMMM YYYY"
        disableMaskedInput
        disableFuture={disableFuture}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            error={Boolean(touched && error)}
            helperText={touched && error}
            size="small"
            fullWidth
          />
        )}
      />
    </LocalizationProvider>
  );
}

export default CustomDatePicker;
