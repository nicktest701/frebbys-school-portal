import React from "react";
import {
  AppBar,
  Badge,
  Button,
  Container,
  Divider,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Menu,
  NotificationsRounded,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import Back from "../../../components/Back";

const TeacherNav = () => {

  return (
    <>
      <AppBar position="sticky">
        <Back
          content={
            <Badge badgeContent={3} color="error">
              <NotificationsRounded />
            </Badge>
          }
        />
        <Toolbar>
          <Container
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">Students</Typography>
            <Stack
              display={{ xs: "none", md: "flex" }}
              direction="row"
              width="100%"
              justifyContent="center"
            >
              <NavLink to="">
                <Button variant="text" color="secondary">
                  Home
                </Button>
              </NavLink>
              <NavLink to="new">
                <Button variant="text" color="secondary">
                  New
                </Button>
              </NavLink>
              <NavLink to="view">
                <Button variant="text" color="secondary">
                  View
                </Button>
              </NavLink>
              <NavLink to="settings">
                <Button variant="text" color="secondary">
                  Settings
                </Button>
              </NavLink>
            </Stack>
            <IconButton
              color="inherit"
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <Menu />
            </IconButton>
          </Container>
        </Toolbar>
      </AppBar>
      <Divider />
    </>
  );
};

export default TeacherNav;
