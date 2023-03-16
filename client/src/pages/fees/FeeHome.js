import React from "react";

import { Box, Container, Stack, Typography } from "@mui/material";
import FeesDashboardCard from "../../components/cards/FeesDashboardCard";
import StudentDashboardCard from "../../components/cards/StudentDashboardCard";
import CustomizedMaterialTable from "../../components/tables/CustomizedMaterialTable";

const FeeHome = () => {
  return (
    <Box
      bgcolor="primary.main"
      sx={{
        position: "relative",
        height: 300,
      }}
    >
      <Container
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            paddingY: 2,
          }}
        >
          <FeesDashboardCard text="Today" />
          <FeesDashboardCard text="Month" />
          <FeesDashboardCard text="Term" />
        </Box>

        <Stack color="primary.contrastText" sx={{ paddingY: 4 }}>
          <Typography variant="h5">Fees Payment</Typography>
          <Typography>
            Access,manage and control payment of school fees
          </Typography>
        </Stack>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <StudentDashboardCard />
          <StudentDashboardCard />
          <StudentDashboardCard />
        </Box>
        <CustomizedMaterialTable columns={[]} data={[]} actions={[]} />
      </Container>
    </Box>
  );
};

export default FeeHome;
