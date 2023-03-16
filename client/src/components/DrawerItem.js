import React, { useState } from "react";
import { Typography, Stack, useTheme } from "@mui/material";
import { NavLink } from "react-router-dom";

const DrawerItem = ({ title, icon, to }) => {
  const { palette } = useTheme();
  const [_showContext, setShowContext] = useState(false);

  const handleFocus = () => {
    setShowContext(true);
  };

  const handleBlur = () => {
    setShowContext(false);
  };
  return (
    <NavLink
      to={to}
      style={{
        textDecoration: "none",
        color: `${palette.primary.main}`,
        // border: "1px solid red",
        paddingInline: "8px",
      }}
    >
      <Stack
        direction="row"
        columnGap={3}
        justifyContent={{ xs: "center", md: "flex-start" }}
        alignItems="center"
        sx={{
          position: "relative",
          padding: 2,
          cursor: "pointer",
          "&:hover": {
            backgroundColor: palette.grey[300],
            borderRadius: "4px",
          },
        }}
        onMouseEnter={handleFocus}
        onMouseLeave={handleBlur}
      >
        {icon}
        <Typography
          variant="body2"
          sx={{ display: { xs: "none", md: "block" }, whiteSpace: "noWrap" }}
        >
          {title}
        </Typography>
      </Stack>
    </NavLink>
  );
};

export default DrawerItem;
