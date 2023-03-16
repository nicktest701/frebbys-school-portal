import { ArrowBackRounded } from "@mui/icons-material";
import { Container, IconButton } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Back = () => {
  const navigate = useNavigate();
  return (
    <Container
      width="inherit"
      sx={{
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingY: 1,
      }}
    >
      <IconButton onClick={() => navigate(-1)}>
        <ArrowBackRounded />
      </IconButton>

      <Link to="/" style={{ color: "#fff" }}>
        Dashboard
      </Link>
    </Container>
  );
};

export default Back;
