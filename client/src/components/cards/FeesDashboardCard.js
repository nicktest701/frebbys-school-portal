import {  BarChartRounded } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import React from "react";

const FeesDashboardCard = ({ text, value }) => {
  return (
    <Stack
    spacing={1}
      sx={{
        width: 200,
        backgroundColor: "#fff",
        padding: 2,
        borderRadius: "8px",
        boxShadow: "0px 1px 20px 10px rgba(84,84,84,0.10)",
    
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography>{text}</Typography>
        <BarChartRounded />
      </Stack>
      <Typography variant="h5">GHS330.20</Typography>
    </Stack>
  );
};

export default FeesDashboardCard;
