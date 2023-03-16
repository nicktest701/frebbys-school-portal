import { PersonRounded, StyleOutlined } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Container, Divider, Stack, Tab, Typography } from "@mui/material";
import React, { useState } from "react";

import SessionHome from "./SessionHome";
import Back from "../../components/Back";
import CustomParticle from "../../components/animations/CustomParticle";
import bg_img from "../../assets/images/empty/about.svg";
const Session = () => {
  const [tab, setTab] = useState("1");

  return (
    <Box
      sx={{
        position: "relative",
        height: "400px",
        width: "100%",
        color: "primary.contrastText",
        bgcolor: "secondary.main",
        // background: `linear-gradient(rgba(1, 46, 84,.5),transparent),url(${bg_img}) no-repeat`,
        // backgroundPositionX: "right",
        // backgroundSize: "cover",
      }}
    >
      <CustomParticle />
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
            <Typography variant="h5">School Session</Typography>
            <Typography>
              Track,manage and control academic and class activities
            </Typography>
          </Stack>
          <StyleOutlined color="inherit" sx={{ width: 50, height: 50 }} />
        </Container>

        <Box paddingY={3}>
          <TabContext value={tab}>
            <TabList onChange={(e, value) => setTab(value)}>
              <Tab
                value="1"
                label="Session"
                icon={<PersonRounded />}
                iconPosition="start"
              />
            </TabList>
            <Divider />
            <TabPanel value="1">
              <SessionHome />
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
    </Box>
  );
};

export default Session;
