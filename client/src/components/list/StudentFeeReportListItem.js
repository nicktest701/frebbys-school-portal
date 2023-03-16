import React, { useContext, useState } from "react";

import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";
import Link from "@mui/material/Link";

import { StudentContext } from "../../context/providers/StudentProvider";
import StudentFeesHistory from "../../pages/fees/StudentFeesHistory";

const StudentFeeReportListItem = ({ item, studentId }) => {
  const { studentDispatch } = useContext(StudentContext);

  const [openFeesHistory, setOpenFeesHistory] = useState(false);

  //View Student Current fee info

  const handleViewFeesDetailsByTerm = (feeId, level) => {
    studentDispatch({
      type: "setCurrentStudentFeeInfo",
      payload: {
        id: studentId,
        level: level,
        feeId,
      },
    });
    setOpenFeesHistory(true);
  };

  return (
    <>
      <List
        subheader={
          <ListSubheader
            sx={{
              bgcolor: "primary.main",
              color: "secondary.main",
              fontSize: 16,
            }}
          >
            {item[0]}
          </ListSubheader>
        }
      >
        {item[1]?.map(({ term, levelId, levelType, id }) => {
          return (
            <ListItem>
              <Stack direction="row" spacing={5} alignItems="center">
                <Divider flexItem orientation="vertical" />
                <Typography variant="body2">{levelType}</Typography>
                <Divider flexItem orientation="vertical" />
                <Typography variant="body2">{term}</Typography>
                <Divider flexItem orientation="vertical" />
                <Link
                  onClick={() => handleViewFeesDetailsByTerm(id, levelId)}
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  View
                </Link>
              </Stack>
            </ListItem>
          );
        })}
      </List>

      <StudentFeesHistory open={openFeesHistory} setOpen={setOpenFeesHistory} />
    </>
  );
};

export default StudentFeeReportListItem;
