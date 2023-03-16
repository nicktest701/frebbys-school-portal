import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React from "react";
import Add from "@mui/icons-material/Add";

const EmptyDataContainer = ({ onClick, buttonText, img, message }) => {
  return (
    <Container sx={{ backgroundColor: "#fff" }}>
      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={3}
        paddingY={4}
      >
        <img
          loading="lazy"
          src={img}
          alt="empty_image"
          style={{
            width: 300,
            height: 300,
            objectFit: "contain",
          }}
        />
        <Typography variant="body2" color="primary" textAlign="center">
          {message}
        </Typography>
        <Button variant="contained" startIcon={<Add />} onClick={onClick}>
          {buttonText}
        </Button>
      </Stack>
    </Container>
  );
};

export default EmptyDataContainer;
