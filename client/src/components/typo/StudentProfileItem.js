import { Stack, Typography } from "@mui/material";
import React from "react";

const StudentProfileItem = ({ label, text }) => {
  return (
    <Stack direction="row" columnGap={5} paddingY={1}>
      <Typography variant="body2" sx={{ width: "25%" }}>
        {label}
      </Typography>
      <Typography variant="body2" color="primary">
        {text}
      </Typography>
    </Stack>
  );
};

export default StudentProfileItem;
