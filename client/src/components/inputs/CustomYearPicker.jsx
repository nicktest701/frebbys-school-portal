import { TextField } from "@mui/material";
import React from "react";
import Datetime from "react-datetime";
import "../../theme/react-datetime.css";
import moment from "moment";
function CustomYearPicker({ label, year, setYear, error, touched }) {
  return (
    <Datetime
      dateFormat="YYYY"
      timeFormat={false}
      initialValue={moment()}
      value={year}
      onChange={(date) => setYear(moment(date).format("YYYY"))}
      closeOnSelect
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
  );
}

export default CustomYearPicker;
