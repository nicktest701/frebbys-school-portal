import React, { useId } from "react";
import { Container, Stack, Typography } from "@mui/material";
import StudentAcademicReportListItem from "../../list/StudentAcademicReportListItem";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getStudentAcademics } from "../../../api/ExaminationAPI";

const StudentAcademics = () => {
  const session = JSON.parse(localStorage.getItem("@school_session"));
  const { studentId, id } = useParams();

  const uniqueId = useId();

  //Get Academic Terms for students
  const studentInfo = useQuery(
    ["student-academics", studentId],
    () => getStudentAcademics(session, studentId, id),
    {
      enabled: !!studentId && !!id,
    }
  );

  return (
    <Container>
      <Typography variant="h6">Student Academics</Typography>
      <Stack>
        {studentInfo?.data !== undefined ? (
          <>
            {studentInfo?.data?.map((session) => {
              return (
                <StudentAcademicReportListItem key={uniqueId} item={session} />
              );
            })}
          </>
        ) : (
          <div>No Academic Records Available</div>
        )}
      </Stack>
    </Container>
  );
};

export default StudentAcademics;
