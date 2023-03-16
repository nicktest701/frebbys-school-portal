import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import Sidebar from "./layouts/Sidebar";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Scrollbars } from "react-custom-scrollbars";
import { EditRounded, NotificationsRounded } from "@mui/icons-material";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import "react-calendar/dist/Calendar.css";
import LineChart from "../components/charts/LineChart";
import "../theme/Calendar.css";
import avatarTwo from "../assets/images/avatars/avatar_2.png";
import BarChart from "../components/charts/BarChart";
import { useQuery } from "@tanstack/react-query";
import { generateNewCurrentLevelDetailsFromLevels } from "../api/levelAPI";
import CustomParticle from "../components/animations/CustomParticle";
import DashboardSwiper from "../components/swiper/DashboardSwiper";
const Dashboard = (props) => {
  const session = JSON.parse(localStorage.getItem("@school_session"));
  const navigate = useNavigate();
  const [value, onChange] = useState(new Date());
  const [academicYear, setAcademicYear] = useState("");
  const [term, setTerm] = useState("");

  useEffect(() => {
    if (_.isEmpty(session)) {
      navigate("/school-session");
    } else {
      const { academicYear, term } = session;
      setAcademicYear(academicYear);
      setTerm(term);
    }
  }, [navigate, session]);

  //check if current level details exists
  useQuery(
    ["generate-current-level-details"],
    () => generateNewCurrentLevelDetailsFromLevels(session),
    {
      enabled: !!session,
    }
  );

  // const handleLogOut = () => {
  //   localStorage.setItem("@school_session", "");
  // };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Sidebar />
        <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>
          <Container
            sx={{
              paddingY: 4,
              height: "100vh",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: 3,
              }}
            >
              <Stack>
                <Typography variant="h5">Welcome,Nana !</Typography>
                <Typography>{new Date().toDateString()}</Typography>
              </Stack>

              <Stack direction="row">
                <IconButton>
                  <NotificationsRounded />
                </IconButton>
                <IconButton>
                  <MoreVertRoundedIcon />
                </IconButton>
              </Stack>
            </Box>
            <Typography
              variant="h5"
              sx={{ textAlign: "right", color: "primary.main" }}
            >
              {academicYear},{term}
            </Typography>

            <Typography variant="h5" sx={{ paddingY: 2 }}>
              Available School Sessions
            </Typography>
            <Divider />
            <DashboardSwiper />
            <Typography variant="h5" sx={{ paddingY: 2 }}>
              School Summary
            </Typography>
            <Divider />
            <Box
              sx={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
                placeItems: "center",
                gap: 1,
                paddingY: 3,
              }}
            >
              <LineChart />
              <BarChart />
            </Box>
          </Container>
        </Scrollbars>
        <Container
          sx={{
            width: "300px",
            display: { xs: "none", md: "inline-block" },
            backgroundColor: "#F7F7F7",
            height: "100%",
            padding: 2,
            paddingY: 4,
            transition: "all 0.4s ease-in-out",
          }}
        >
          <Box>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle2">Profile</Typography>
              <IconButton>
                <EditRounded />
              </IconButton>
            </Stack>

            <Stack alignItems="center">
              <Avatar src={avatarTwo} sx={{ width: 80, height: 80 }} />
              <Typography variant="subtitle2">Nana Akwasi</Typography>
              <Typography variant="body2">@Akwasi</Typography>
            </Stack>
          </Box>
          <Box>
            <Typography variant="subtitle2">Calendar</Typography>
            <Box>
              <Calendar onChange={onChange} value={value} />
            </Box>
          </Box>
        </Container>
      </Box>
      <CustomParticle />
    </>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
