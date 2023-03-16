import React, { useState, useEffect } from "react";
import { Container, Stack, Typography } from "@mui/material";
import _ from "lodash";
import StudentReportListItem from "../../list/StudentReportListItem";

const StudentFees = ({ studentId }) => {
  const [session, setSession] = useState([]);
  useEffect(() => {
    // const groupSession = _.groupBy(sessionData, "academicYear");
    // setSession(Object.entries(groupSession));
  }, []);
  return (
    <Container>
      <Typography variant="h6" sx={{ paddingY: 2 }}>
        Student Fees History
      </Typography>
      <Stack
        sx={{
          width: "100%",
          maxHeight: 500,
          overflowY: "scroll",
          // border: "1px solid black",
        }}
      >
        {session !== undefined ? (
          <div>
            {session.map((item, index) => {
              return (
                <StudentReportListItem
                  key={index}
                  item={item}
                  studentId={studentId}
                />
              );
            })}
          </div>
        ) : (
          <div>Hello</div>
        )}
      </Stack>
    </Container>
  );
};

export default StudentFees;
