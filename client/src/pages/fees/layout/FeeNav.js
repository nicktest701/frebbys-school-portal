import React from "react";
import { AppBar, IconButton, Stack, Toolbar } from "@mui/material";
import { Menu } from "@mui/icons-material";
import Back from "../../../components/Back";
import NavLinkItem from "../../../components/list/NavLinkItem";

const FeeNav = () => {
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
            <NavLinkItem to="" color="secondary" text="Dashboard" />
            <NavLinkItem to="new" color="secondary" text="New" />
            <NavLinkItem to="payment" color="secondary" text="Make Payment" />
            <NavLinkItem to="history" color="secondary" text="Fees History" />
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

export default FeeNav;
