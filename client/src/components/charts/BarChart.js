import React from "react";
import { Bar } from "react-chartjs-2";
import { useTheme, Box } from "@mui/material";

const LineChart = () => {
  const { palette } = useTheme();

  return (
    <Box
      sx={{
        minWidth: 150,
          height: 150,
      }}
    >
      <Bar
        data={{
          labels: ["Term 1", "Term 2", "Term 3"],
          datasets: [
            {
              label: "Boys",
              data: [1, 2, 3],
              backgroundColor: palette.primary.main,
            },

            {
              label: "Girls",
              data: [5, 1, 2],
              backgroundColor: palette.secondary.main,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: 10,
            autoPadding: true,
          },
          plugins: {
            legend: {
              // display: false,
            },
          },
        }}
      />
    </Box>
  );
};

export default LineChart;
