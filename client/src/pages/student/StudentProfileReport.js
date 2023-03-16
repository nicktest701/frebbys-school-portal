import React, { useContext, useState } from "react";
import {
  Stack,
  Typography,
  Button,
  Divider,
  Avatar,
  Container,
  Tab,
} from "@mui/material";
import {
  MessageRounded,
  NoteRounded,
  PersonRounded,
  ReportRounded,
} from "@mui/icons-material";
import _ from "lodash";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useParams,  } from "react-router-dom";
import StudentProfile from "../../components/tabs/student/StudentProfile";
import StudentFees from "../../components/tabs/student/StudentFees";
import StudentAcademics from "../../components/tabs/student/StudentAcademics";
import { useQuery } from "@tanstack/react-query";
import { getStudentsByID } from "../../api/studentAPI";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";

const StudentProfileReport = () => {
  
  ///Params
  const { studentId ,id,type} = useParams();

  //States
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const [tab, setTab] = useState("1");

  ///
  const { data: student } = useQuery(
    ["student-by-id"],
    () => getStudentsByID(studentId, id, type),
    {
      enabled: !!studentId,
    }
  );

  //OPEN Quick Message
  //CLOSE
  const openQuickMessage = () => {
    schoolSessionDispatch({
      type: "sendQuickMessage",
      payload: {
        open: true,
        data: {
          email: student?.email,
          phonenumber: student?.phonenumber,
        },
      },
    });
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        padding: 2,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: { xs: "center", md: "space-between" },
        alignItems: { xs: "center", md: "flex-start" },
        gap: 5,
      }}
    >
      <Stack
        spacing={1}
        justifyContent="center"
        alignItems="center"
        paddingTop={{ xs: 1, md: 5 }}
      >
        <Avatar
          srcSet={
            student?.profile === "" || student?.profile === undefined
              ? null
              : `${process.env.REACT_APP_BASE_NET_LOCAL}/images/students/${student?.profile}`
          }
          sx={{
            width: 120,
            height: 120,
          }}
        />

        <Typography variant="h6">{student?.fullName}</Typography>
        <Typography variant="body2">{`${student?.levelName}`}</Typography>
        <Button
          variant="contained"
          startIcon={<MessageRounded />}
          onClick={openQuickMessage}
        >
          Send Message
        </Button>
      </Stack>
      <Divider flexItem />
      <Stack sx={{ height: "100%", flexGrow: 1 }}>
        <TabContext value={tab}>
          <TabList onChange={(e, value) => setTab(value)}>
            <Tab
              value="1"
              label="Profile"
              icon={<PersonRounded />}
              iconPosition="start"
            />
            <Tab
              value="2"
              label="Academic Records"
              icon={<ReportRounded />}
              iconPosition="start"
            />
            <Tab
              value="3"
              label="Fees History"
              icon={<NoteRounded />}
              iconPosition="start"
            />
          </TabList>
          <Divider />
          <TabPanel value="1">
            <StudentProfile student={student} />
          </TabPanel>
          <TabPanel value="2">
            <StudentAcademics />
          </TabPanel>
          <TabPanel value="3">
            <StudentFees />
          </TabPanel>
        </TabContext>
      </Stack>
    </Container>
  );
};

export default StudentProfileReport;
