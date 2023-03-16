import React from "react";
import {
  Divider,
  List,
  Typography,
  Stack,
  ListItem,
  ListSubheader,
} from "@mui/material";
import { Link } from "react-router-dom";

const StudentReportListItem = ({ item }) => {
  return (
    <List
      subheader={
        <ListSubheader sx={{ backgroundColor: "rgba(0,0,0,0.05)" }}>
          {item.academicYear}- {item.level}
        </ListSubheader>
      }
    >
      {item?.terms.map(({ term }, index) => {
        return (
          <ListItem key={index}>
            <Stack direction="row" spacing={5} alignItems="center">
              <Divider flexItem orientation="vertical" />
              <Typography variant="body2">{term}</Typography>
              <Divider flexItem orientation="vertical" />
              <Link to={`/student/exam/${index}`}>View</Link>
            </Stack>
          </ListItem>
        );
      })}
    </List>
  );
};

export default StudentReportListItem;
