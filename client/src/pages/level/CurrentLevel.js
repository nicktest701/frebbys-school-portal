import { PersonRounded } from "@mui/icons-material";
import SchoolIcon from "@mui/icons-material/School";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Container, Divider, Stack, Tab, Typography } from "@mui/material";

import React, { useState } from "react";
import Back from "../../components/Back";
import CurrentLevelTab from "./CurrentLevelTab";

const CurrentLevel = () => {
  const [tab, setTab] = useState("1");

  
  return (
    <Box
      sx={{
        position: "relative",
        height: "400px",
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
            <Typography variant="h5">Current Level </Typography>
            <Typography>
              Track,manage and control academic and level activities
            </Typography>
          </Stack>
          <SchoolIcon color="inherit" sx={{ width: 50, height: 50 }} />
        </Container>

        <Box paddingY={3}>
          <TabContext value={tab}>
            <TabList onChange={(e, value) => setTab(value)}>
              <Tab
                value="1"
                label="Students"
                icon={<PersonRounded />}
                iconPosition="start"
              />
            </TabList>
            <Divider />
            <TabPanel value="1">
              <CurrentLevelTab />
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
    </Box>
  );
};

export default CurrentLevel;
