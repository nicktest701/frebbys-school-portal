import { PieChartRounded } from "@mui/icons-material";
import { Box, Button, Chip, Stack, useTheme } from "@mui/material";
import { Line } from "react-chartjs-2";

const StudentDashboardLineChart = ({ students, females, males }) => {
  const { palette } = useTheme();
  console.log(females, males);
  return (
    <Stack
      sx={{
        bgcolor: "primary.contrastText",
        padding: 1,
        borderRadius: "8px",
        boxShadow: "0px 1px 20px 10px rgba(84,84,84,0.10)",
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button startIcon={<PieChartRounded />}>Total Students</Button>
        <Chip
          label={students ?? 0}
          color="primary"
          size="medium"
          sx={{ fontSize: 20 }}
        />
      </Stack>
      <Box
        sx={{
          minWidth: 150,
          height: 150,
        }}
      >
        <Line
          datasetIdKey="id"
          data={{
            labels: ["Males", "Females"],

            datasets: [
              {
                data: [males === undefined ? 0 : males],
                backgroundColor: [palette.primary.main],
                label: ["Males"],
              },
              {
                data: [females === undefined ? 0 : females],
                backgroundColor: [palette.secondary.main],
                label: ["Females"],
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
                // display: false,
              },
            },
          }}
        />
      </Box>
    </Stack>
  );
};

export default StudentDashboardLineChart;
