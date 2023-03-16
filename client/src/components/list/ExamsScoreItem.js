import {
  Divider,
  Link,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import React from "react";

const ExamsScoreItem = ({ item, removeSubject, title }) => {
  return (
    <>
      <ListItem>
        <ListItemText secondary={item?.subject} />
        <ListItemText secondary={item?.classScore} />
        <ListItemText secondary={item?.examsScore} />
        <ListItemText secondary={item?.totalScore} />
        <ListItemText secondary={item?.grade} />
        <ListItemSecondaryAction>
          {!title && (
            <Link
              sx={{ cursor: "pointer", fontSize: "12px" }}
              onClick={() => removeSubject(item.subject)}
            >
              Remove
            </Link>
          )}
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </>
  );
};

export default ExamsScoreItem;
