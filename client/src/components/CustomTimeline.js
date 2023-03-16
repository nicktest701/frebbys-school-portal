import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector"
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import Typography from "@mui/material/Typography";

export default function CustomTimeline() {
  return (
    <Timeline >
      <TimelineItem>
        <TimelineOppositeContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            Student
          </Typography>
          <Typography>Because you need strength</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot>
            <FastfoodIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            Student
          </Typography>
          <Typography>Because you need strength</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot>
            <FastfoodIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
      </TimelineItem>
    </Timeline>
  );
}
