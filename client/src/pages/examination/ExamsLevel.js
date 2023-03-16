import React, { useContext } from "react";
import { Box, Container, Link, Stack, Typography } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import FunctionsOutlinedIcon from "@mui/icons-material/FunctionsOutlined";
import DoNotDisturbOnTotalSilenceOutlinedIcon from "@mui/icons-material/DoNotDisturbOnTotalSilenceOutlined";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import Back from "../../components/Back";
import CustomizedMaterialTable from "../../components/tables/CustomizedMaterialTable";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { STUDENTS_EXAMS_COLUMN } from "../../mockup/columns/studentColumns";
import ExamsHomeCard from "../../components/cards/ExamsHomeCard";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";
import ExamsScore from "./ExamsScore";
import { getExamsDetails } from "../../api/ExaminationAPI";
import useLevelById from "../../components/hooks/useLevelById";

const ExamsLevel = () => {
  const session = JSON.parse(localStorage.getItem("@school_session"));
  const { levelId } = useParams();

  const { schoolSessionDispatch } = useContext(SchoolSessionContext);

  //GET All Details about exams

  const examDetails = useQuery({
    queryKey: ["exams-details"],
    queryFn: () =>
      getExamsDetails({
        sessionId: session.sessionId,
        termId: session.termId,
        levelId,
      }),
  });

  //FETCH all students from current level
  const { levelLoading, students, refetch } = useLevelById(levelId);

  const column = [
    ...STUDENTS_EXAMS_COLUMN,

    {
      field: null,
      title: "Exams Details",
      render: (rowData) => {
        return (
          <Link
            onClick={() => {
              schoolSessionDispatch({
                type: "openAddExamsScore",
                payload: {
                  open: true,
                  data: {
                    levelId,
                    studentId: rowData._id,
                    sessionId: session.sessionId,
                    termId: session.termId,
                  },
                },
              });
            }}
          >
            View Details
          </Link>
        );
      },
    },
  ];

  const iconStyle = { width: 32, height: 32 };

  return (
    <Container>
      <Back />

      <Stack color="primary.main" paddingX={3} paddingY={6}>
        <Typography variant="h5">Examination Portal</Typography>
        <Typography>
          Track,manage and control academic and class activities
        </Typography>
      </Stack>

      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: 2,
        }}
      >
        <ExamsHomeCard
          title="Total Student"
          value={examDetails.data?.noOfStudents}
          icon={<PersonOutlineOutlinedIcon sx={iconStyle} />}
          color="primary"
        />
        <ExamsHomeCard
          title="Highest Marks"
          value={examDetails.data?.highestMarks}
          icon={<BookmarksOutlinedIcon sx={iconStyle} />}
          color="warning"
        />
        <ExamsHomeCard
          title="Average Marks"
          value={examDetails.data?.averageMarks}
          icon={<FunctionsOutlinedIcon sx={iconStyle} />}
          color="info"
        />
        <ExamsHomeCard
          title="Lowest Marks"
          value={examDetails.data?.lowestMarks}
          icon={<DoNotDisturbOnTotalSilenceOutlinedIcon sx={iconStyle} />}
          color="success"
        />
        <ExamsHomeCard
          title="Pass Students"
          value={examDetails.data?.passStudents}
          icon={<CheckCircleOutlinedIcon sx={iconStyle} />}
          color="success"
        />
        <ExamsHomeCard
          title="Failed Students"
          value={examDetails.data?.failStudents}
          icon={<HighlightOffOutlinedIcon sx={iconStyle} />}
          color="error"
        />
      </Box>

      <CustomizedMaterialTable
        title="Students"
        isLoading={levelLoading}
        columns={column}
        data={students}
        actions={[]}
        handleRefresh={refetch}
      />
      <ExamsScore />
    </Container>
  );
};

export default ExamsLevel;
