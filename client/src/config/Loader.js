import { Backdrop, useTheme } from "@mui/material";
import React from "react";
import { InfinitySpin } from "react-loader-spinner";
import Wifi from "../components/spinners/Wifi";

const Loader = () => {
  const { palette } = useTheme();
  // color={palette.primary.main}
  return (
    <Backdrop
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "transparent",
      }}
      open={true}
    >
      {/* <InfinitySpin width="200" color={palette.primary.main} /> */}
      <Wifi/>
    </Backdrop>
  );
};

export default Loader;
