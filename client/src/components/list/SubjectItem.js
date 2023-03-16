import {
  Divider,
  Link,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import React from "react";

const SubjectItem = ({ subject, removeSubject }) => {
  return (
    <>
      <ListItem>
        <ListItemText secondary={subject} />
        <ListItemSecondaryAction>
          <Link
            size="small"
            sx={{ cursor: "pointer" }}
            onClick={() => removeSubject(subject)}
          >
            Remove
          </Link>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </>
  );
};

export default SubjectItem;
