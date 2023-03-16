import {
  Divider,
  Link,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import React from "react";
import { currencyFormatter } from "../../config/currencyFormatter";

const FeeItem = ({ data, removeFee }) => {
  return (
    <>
      <ListItem>
        <ListItemText secondary={data?.fee} />
        <ListItemText secondary={currencyFormatter(data.amount)} />
        <ListItemSecondaryAction>
          <Link
            size="small"
            sx={{ cursor: "pointer" }}
            onClick={() => removeFee(data?.fee)}
          >
            Remove
          </Link>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </>
  );
};

export default FeeItem;
