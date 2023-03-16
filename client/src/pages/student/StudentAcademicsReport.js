import React, { useContext, useState } from "react";
import {
  Avatar,
  Button,
  ButtonGroup,
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { AddRounded, EditRounded, ReportRounded } from "@mui/icons-material";
import { StudentContext } from "../../context/providers/StudentProvider";
// import CustomizedTable from "../../components/tables/CustomizedTable";
import { studentExamsReportColumns } from "../../mockup/columns/studentColumns";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import AddExamsScore from "../../components/modals/AddExamsScore";

import StudentAcademicsReportView from "../../components/modals/StudentAcademicsReportView";
import { getExams } from "../../api/ExaminationAPI";

const StudentAcademicsReport = () => {
  const { examsId } = useParams();
  const { palette } = useTheme();
  const [levelId, setLevelId] = useState("");

  const { studentDispatch } = useContext(StudentContext);

  const [openExamsScore, setOpenExamsScore] = useState(false);

  const { data: student } = useQuery(
    ["student-records", examsId],
    () => getExams(examsId),
    {
      enabled: !!examsId,
      onSuccess: (studentRecords) => {
        // console.log(studentRecords);
        studentDispatch({
          type: "showCurrentStudentAcademicsReportView",
          payload: {
            show: false,
            examsDetails: studentRecords,
          },
        });
        setLevelId(studentRecords.levelId);
      },
    }
  );

  const handleViewExamsReport = () => {
    setLevelId(student?.levelId);
    studentDispatch({
      type: "showCurrentStudentAcademicsReportView",
      payload: {
        show: true,
        examsDetails: student,
      },
    });
  };

  return (
    <Container sx={{ paddingY: 2 }} maxWidth="lg">
      <div id="printPage">
        <Stack justifyContent="flex-end" direction="row">
          <Typography variant="h3">Student Examination Report</Typography>
        </Stack>
        <Divider />

        <Stack paddingY={2} justifyContent="center" alignItems="center">
          <Avatar
            src={
              student?.profile === "" ||
              student?.profile === undefined ||
              student?.profile === null
                ? null
                : `${process.env.REACT_APP_BASE_NET_LOCAL}/images/students/${student?.profile}`
            }
            sx={{ width: 80, height: 80 }}
          />
          <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
            {student?.fullName}
          </Typography>
          <Typography variant="body2">{student?.level}</Typography>
        </Stack>

        <Divider />

        <Stack>
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              textDecoration: "underline",
              borderTop: `solid 5px ${palette.secondary.main}`,
              bgcolor: "primary.main",
              color: "primary.contrastText",
              width: "100%",
              padding: 1,
            }}
          >
            Examination Report
          </Typography>
          <Stack justifyContent="flex-end" direction="row" paddingY={2}>
            <ButtonGroup>
              <Button
                startIcon={<AddRounded />}
                variant="contained"
                onClick={() => setOpenExamsScore(true)}
              >
                New Score
              </Button>
              <Button
                startIcon={<ReportRounded />}
                onClick={handleViewExamsReport}
              >
                View Report
              </Button>
            </ButtonGroup>
          </Stack>
        </Stack>
      </div>

      {/* <CustomizedTable
        title={student?.term}
        columns={[
          ...studentExamsReportColumns,
          {
            name: "edit",
            label: "Edit",
            options: {
              empty: true,
              customBodyRenderLite: (dataIndex) => (
                <IconButton
                  variant="contained"
                  color="primary"
                  size="small"
                  // onClick={() => handleViewSingleFeesReport(dataIndex)}
                >
                  <EditRounded />
                </IconButton>
              ),
            },
          },
        ]}
        data={student?.scores !== undefined ? student?.scores : []}
        options={{
          pagination: false,
          viewColumns: false,
          print: false,
          filter: false,
          responsive: "standard",
          fixedHeader: true,
          fixedSelectColumn: true,
          // onRowSelectionChange: handleRowChange,
        }}
      /> */}

      <StudentAcademicsReportView />

      <AddExamsScore
        open={openExamsScore}
        setOpen={setOpenExamsScore}
        levelId={levelId}
      />
    </Container>
  );
};

export default StudentAcademicsReport;
