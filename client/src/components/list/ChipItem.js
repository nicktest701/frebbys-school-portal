import { Chip, Divider } from "@mui/material";
import React from "react";

const ChipItem = ({ divider, label, icon }) => {
  return divider ? (
    <Divider textAlign="left">
      <Chip
        label={label}
        size="small"
        color="primary"
        icon={icon ? icon : null}
      />
    </Divider>
  ) : (
    <Chip
      label={label}
      size="small"
      color="primary"
      icon={icon ? icon : null}
    />
  );
};

export default ChipItem;
