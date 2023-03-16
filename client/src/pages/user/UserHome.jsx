import {
  GroupRounded,
  Groups2Rounded,
  Person4Rounded,
  StyleOutlined,
} from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Container, Divider, Stack, Tab, Typography } from "@mui/material";
import React, { useState } from "react";
import Back from "../../components/Back";
import UserTab from "./UserTab";

function UserHome() {
  const [tab, setTab] = useState("1");

  return (
    <Box
      sx={{
        position: "relative",
        height: 350,
        color: "primary.contrastText",
        bgcolor: "primary.main",
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
          <Stack>
            <Typography variant="h5">Administrators & Users</Typography>
            <Typography>Manage information and details of users</Typography>
          </Stack>
          <Groups2Rounded color="inherit" sx={{ width: 50, height: 50 }} />
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

        <TabContext value={tab}>
          <TabList onChange={(e, value) => setTab(value)}>
            <Tab
              value="1"
              label="Users"
              icon={
                <Person4Rounded
                  sx={{
                    color: "secondary.main",
                  }}
                />
              }
              iconPosition="start"
              sx={{
                color: "secondary.main",
              }}
            />
          </TabList>
          <Divider />
          <TabPanel value="1">
            <UserTab />
          </TabPanel>
        </TabContext>
      </Container>
    </Box>
  );
}

export default UserHome;
