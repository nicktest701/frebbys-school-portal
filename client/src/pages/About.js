import { Container, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import about from "../assets/images/empty/about_bg.svg";
import { useNavigate } from "react-router-dom";
const About = (props) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: `url(${about}) no-repeat`,
        backgroundAttachment: "scroll",
        minHeight: "100%",
        backgroundSize: "cover",
      }}
    >
      <Container maxWidth="md" sx={{ padding: 2 }}>
        <IconButton color="primary" onClick={() => navigate("/")}>
          <ArrowBackRoundedIcon sx={{ width: 50, height: 50 }} />
        </IconButton>
        <Stack rowGap={2}>
          <Typography textAlign="right" variant="h2">
            About Us
          </Typography>
          <Typography>
            Welcome to FrebbyTech School Manager, the all-in-one solution for
            managing student information and improving school operations. Our
            powerful software makes it easy for administrators and educators to
            handle everything from attendance tracking to grade reporting.
          </Typography>
          <Typography>
            With FrebbyTech School Manager, you can quickly access and update
            student records, track attendance, and manage schedules. Our
            software also allows you to generate detailed reports and analytics
            to help you make informed decisions about student progress and
            school operations.
          </Typography>

          <Typography>
            Another important aspect of FrebbyTech School Manager is its
            user-friendliness. We understand that educators and administrators
            have a lot on their plates, and we've designed our software to be
            intuitive and easy to use. Our interface is straightforward and our
            workflows are streamlined, so you can spend less time navigating
            software and more time working with students.
          </Typography>
          <Typography>
            Finally, FrebbyTech School Manager is designed to help schools
            become more efficient and effective. By automating many of the
            routine administrative tasks that can take up so much time, our
            software frees up educators and administrators to focus on what they
            do best - educating students and improving the quality of education.
          </Typography>
          <Typography>
            We're confident that FrebbyTech School Manager is the right choice
            for your school. Try it out today and see how it can help you
            streamline your operations and improve student outcomes!
          </Typography>

          <Typography textAlign="center" fontWeight="bold">
            All rights reserved | FrebbyTech Consults @{" "}
            {new Date().getFullYear()}
          </Typography>
        </Stack>
      </Container>
    </div>
  );
};

About.propTypes = {};

export default About;
