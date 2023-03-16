import React from "react";
import { Box, useTheme } from "@mui/material";
import PieChart from "../charts/PieChart";

const SMSCards = () => {
  const { palette } = useTheme();
  return (
    <Box
      sx={{
        width: 280,
        height: 200,
        borderRadius: 1,
        border: `1px solid ${palette.primary.main}`,
      }}
    >
      <PieChart />
    </Box>
  );
};

export default SMSCards;
