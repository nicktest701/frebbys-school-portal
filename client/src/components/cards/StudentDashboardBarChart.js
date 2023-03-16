import {  BarChartRounded } from "@mui/icons-material";
import { Button, Chip, Stack, Typography } from "@mui/material";
import React from "react";
import BarChart from "../charts/BarChart";

const StudentDashboardBarChart = () => {
  return (
    <Stack
      sx={{
        bgcolor: "primary.contrastText",
        padding: 2,
        borderRadius: "8px",
        boxShadow: "0px 1px 20px 10px rgba(84,84,84,0.10)",
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button startIcon={<BarChartRounded />}>Total Students</Button>
        <Chip label="3.2k" color="primary" size="medium" />
      </Stack>
      <BarChart />
    </Stack>
  );
};

export default StudentDashboardBarChart;

// sx={{
//   backgroundColor: "#fff",
//   padding: 2,
//   borderRadius: "8px",
//   boxShadow: "0px 1px 20px 10px rgba(84,84,84,0.10)",
//   borderInlineStart: "2px solid",
//   borderBlockStart: "2px solid",
//   borderTopLeftRadius: "8px",
//   borderImageSource:
//     "radial-gradient(circle at top left,#012E54,transparent 50%)",
//   borderImageSlice: "1",
// }}
