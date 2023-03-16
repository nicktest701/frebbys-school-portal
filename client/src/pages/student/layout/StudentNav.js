import React from "react";
import { AppBar, IconButton, Stack, Toolbar } from "@mui/material";
import Menu from "@mui/icons-material/Menu";
import Back from "../../../components/Back";
import NavLinkItem from "../../../components/list/NavLinkItem";

const StudentNav = () => {
  return (
    <>
      <AppBar position="sticky">
        <Back />
        <Toolbar>
          <Stack
            display={{ xs: "none", md: "flex" }}
            direction="row"
            width="100%"
            justifyContent="center"
          >
            <NavLinkItem to="" color="secondary" text="Home" />
            <NavLinkItem to="new" color="secondary" text="New" />
            <NavLinkItem to="view" color="secondary" text="View" />
            <NavLinkItem to="settings" color="secondary" text="Settings" />
          </Stack>
          <IconButton
            color="inherit"
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <Menu />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default StudentNav;
