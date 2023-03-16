import { PieChartRounded } from "@mui/icons-material";
import { Box, Button, Chip, Stack, useTheme } from "@mui/material";
import { Doughnut } from "react-chartjs-2";

const StudentDashboardPieChart = ({ students, females, males }) => {
  const { palette } = useTheme();
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
        <Chip label={students ?? 0} color="primary" size="medium" sx={{fontSize:20}}/>
      </Stack>
      <Box
        sx={{
          minWidth: 150,
          height: 150,
        }}
      >
        <Doughnut
          datasetIdKey="id"
          data={{
            labels: ["Males", "Females"],

            datasets: [
              {
                data: [males, females],
                backgroundColor: [palette.primary.main, palette.secondary.main],
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

export default StudentDashboardPieChart;
