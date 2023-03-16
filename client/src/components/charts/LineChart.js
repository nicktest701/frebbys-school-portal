import React from "react";
import { Line } from "react-chartjs-2";
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
      <Line
        datasetIdKey="id"
        data={{
          labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],

          datasets: [
            {
              data: [65, 34, 90, 47, 59],
              borderColor: palette.primary.main,
            },
            {
              data: [90, 12, 54, 47, 12],
              borderColor: palette.secondary.main,
            },
          ],

        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: 10,
          },
          scales: {
            x: {
              ticks: {
                display: false,
              },
            },
            y: {
              ticks: {
                display: false,
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
    </Box>
  );
};

export default LineChart;
