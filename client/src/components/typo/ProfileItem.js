import { Stack, Typography } from "@mui/material";
import React from "react";

const ProfileItem = ({ label, text }) => {
  return (
    <Stack direction="row" columnGap={5} paddingY={1}>
      <Typography
        variant="body2"
        sx={{ width: "40%", whiteSpace: "nowrap", fontWeight: "bold" }}
      >
        {label}
      </Typography>
      <Typography
        variant="body2"
        color="primary"
        sx={{ width: "50%", textTransform: "capitalize" }}
      >
        {text}
      </Typography>
    </Stack>
  );
};

export default ProfileItem;
