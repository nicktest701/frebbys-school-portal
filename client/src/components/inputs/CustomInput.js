import { TextField } from "@mui/material";
import React, { useState } from "react";
const CustomInput = () => {
  const [value, setValue] = useState("");

  return (
    <TextField
      label="Firstname"
      type="text"
      fullWidth
      size="small"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default CustomInput;
