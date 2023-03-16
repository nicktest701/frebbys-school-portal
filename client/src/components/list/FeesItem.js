import { Divider, Stack, Typography } from "@mui/material";
import React from "react";

const FeesItem = ({ item }) => {
  return (
    <Stack spacing={1}>
      <Stack direction="row">
        <Typography sx={{ width: "25%", fontWeight: "bold" }}>
          Date of Issue
        </Typography>
        <Typography>{item.date}</Typography>
      </Stack>
      <Stack direction="row">
        <Typography sx={{ width: "25%", fontWeight: "bold" }}>
          Received from:
        </Typography>
        <Typography>{item.studentId}</Typography>
      </Stack>
      <Stack direction="row">
        <Typography sx={{ width: "25%", fontWeight: "bold" }}>Level</Typography>
        <Typography>Class Six(6)</Typography>
      </Stack>
      <Stack direction="row">
        <Typography sx={{ width: "25%", fontWeight: "bold" }}>
          Amount Paid:
        </Typography>
        <Typography>{item.amountPaid}</Typography>
      </Stack>
      <Stack direction="row">
        <Typography sx={{ width: "25%", fontWeight: "bold" }}>
          Outstanding:
        </Typography>
        <Typography>{item.amountOutstanding}</Typography>
      </Stack>
      <Stack direction="row">
        <Typography sx={{ width: "25%", fontWeight: "bold" }}>
          Issuer:
        </Typography>
        <Typography>{item.issuer}</Typography>
      </Stack>
      <Divider/>
    </Stack>
  );
};

export default FeesItem;
