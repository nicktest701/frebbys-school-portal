import React from "react";

import {
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import Person2Rounded from "@mui/icons-material/Person2Rounded";
import LocalLibraryRounded from "@mui/icons-material/LocalLibraryRounded";
import PaymentsRounded from "@mui/icons-material/PaymentsRounded";
import StyleRoundedIcon from "@mui/icons-material/StyleRounded";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import SmsRounded from "@mui/icons-material/SmsRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import BedroomBabyRoundedIcon from "@mui/icons-material/BedroomBabyRounded";
import DataThresholdingRoundedIcon from "@mui/icons-material/DataThresholdingRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import DrawerItem from "../../components/DrawerItem";
import Scrollbars from "react-custom-scrollbars";
const Sidebar = () => {
  return (
    <Container
      sx={{
        display: { xs: "none", sm: "flex" },
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: { xs: "center", md: "flex-start" },
        width: { xs: 0, sm: 80, md: 250 },
        height: "100dvh",
        borderRight: "2px solid #F3F5F9",
        paddingY: 2,
        transition: "all 0.4s ease-in-out",
      }}
    >
      <Stack alignItems={{ xs: "center", sm: "flex-start" }}>
        <IconButton color="primary">
          <StyleRoundedIcon sx={{ width: 40, height: 40 }} />
        </IconButton>
        <Stack alignItems="start" display={{ xs: "none", md: "block" }}>
          <Typography sx={{ fontSize: "15px", fontWeight: "900" }}>
            Wonder Goodness
          </Typography>
          <Typography
            variant="body2"
            sx={{
              whiteSpace: "nowrap",
            }}
          >
            Management System
          </Typography>
        </Stack>
      </Stack>
      {/* <Divider /> */}
      <Stack padding={1}>
        <DrawerItem title="Dashboard" icon={<GridViewRoundedIcon />} to="/" />
        <DrawerItem
          title="Session"
          icon={<ArticleRoundedIcon />}
          to="/session"
        />
        <DrawerItem
          title="Levels & Subjects"
          icon={<BedroomBabyRoundedIcon />}
          to="/level"
        />
        <DrawerItem
          title="Student"
          icon={<LocalLibraryRounded />}
          to="/student"
        />
        <DrawerItem title="Teacher" icon={<Person2Rounded />} to="/teacher" />
        <DrawerItem title="School Fees" icon={<PaymentsRounded />} to="/fee" />
        <DrawerItem
          title="Examination"
          icon={<DataThresholdingRoundedIcon />}
          to="/examination"
        />
        <DrawerItem
          title="Assessment"
          icon={<EventNoteRoundedIcon />}
          to="/assessment"
        />
        <DrawerItem title="SMS Portal" icon={<SmsRounded />} to="/sms" />
        <DrawerItem title="Users" icon={<PeopleAltRoundedIcon />} to="/users" />
        <DrawerItem
          title="Settings"
          icon={<SettingsRoundedIcon />}
          to="/settings"
        />
        <DrawerItem title="About" icon={<InfoRoundedIcon />} to="/about" />
      </Stack>

      <IconButton variant="contained" color="primary">
        <CancelRoundedIcon />
      </IconButton>
    </Container>
  );
};

Sidebar.propTypes = {};

export default Sidebar;
