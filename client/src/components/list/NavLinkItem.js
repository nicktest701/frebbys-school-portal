import { Button } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

const NavLinkItem = ({ to, text, color }) => {
  return (
    <NavLink to={to}>
      <Button variant="text" color={color}>
        {text}
      </Button>
    </NavLink>
  );
};

export default NavLinkItem;
