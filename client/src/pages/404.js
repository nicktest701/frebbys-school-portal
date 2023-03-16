import { Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Stack
      rowGap={5}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Typography variant="h1">Page Not Found</Typography>
      <Link to="/">Go Home</Link>
    </Stack>
  );
};

export default PageNotFound;
