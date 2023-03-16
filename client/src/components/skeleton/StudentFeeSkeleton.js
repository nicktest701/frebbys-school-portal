import { Skeleton } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

const StudentFeeSkeleton = () => {
  return (
    <Stack justifyContent="center" spacing={3} alignItems="center">
      <Skeleton
        animation="wave"
        variant="circular"
        width={80}
        height={80}
        sx={{ marginBottom: 4 }}
      />
      <Skeleton
        animation="wave"
        variant="rectangular"
        width={"100%"}
        height={40}
      />
      <Skeleton
        animation="wave"
        variant="rectangular"
        width={"100%"}
        height={40}
      />
      <Skeleton
        animation="wave"
        variant="rectangular"
        width={"100%"}
        height={40}
      />
    </Stack>
  );
};

export default StudentFeeSkeleton;
