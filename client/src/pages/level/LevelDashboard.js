import React, { useState } from "react";
import { PersonRounded, StyleOutlined } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Container, Divider, Stack, Tab, Typography } from "@mui/material";
import StudentDashboardCard from "../../components/cards/StudentDashboardCard";
import Back from "../../components/Back";
import LevelTab from "./LevelTab";
import useLevel from "../../components/hooks/useLevel";

const LevelDashboard = () => {
  const [tab, setTab] = useState("1");
  const { levelsOption } = useLevel();

  return (
    <Box
      sx={{
        position: "relative",
        height: 350,
        color: "primary.contrastText",
        bgcolor: "secondary.main",
      }}
    >
      <Container
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Back />
        <Container
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            paddingY: 2,
          }}
        >
          <Stack color="primary.main">
            <Typography variant="h5">School Class & Subjects</Typography>
            <Typography>Add and Track new Classes and Subjects</Typography>
          </Stack>
          <StyleOutlined color="inherit" sx={{ width: 50, height: 50 }} />
        </Container>

        <Typography
          variant="h6"
          sx={{
            paddingY: 2,
            color: "primary.contrastText",
          }}
        >
          Overview
        </Typography>

        {levelsOption.length !== 0 && (
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
        )}

        <TabContext value={tab}>
          <TabList onChange={(e, value) => setTab(value)}>
            <Tab
              value="1"
              label="Level"
              icon={<PersonRounded />}
              iconPosition="start"
            />
          </TabList>
          <Divider />
          <TabPanel value="1">
            <LevelTab />
          </TabPanel>
        </TabContext>
      </Container>
    </Box>
  );
};

export default LevelDashboard;
