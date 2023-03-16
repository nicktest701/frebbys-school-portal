import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tab,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";
import ExamsReport from "./ExamsReport";
import ExamsScoreInput from "./ExamsScoreInput";
import ExamsScoreList from "./ExamsScoreList";

function ExamsScore() {
  const { schoolSessionState, schoolSessionDispatch } =
    useContext(SchoolSessionContext);
  const openExamsScore = schoolSessionState.examsScore;

  //tab
  const [tab, setTab] = useState("1");

  //CLOSE FORM
  const handleClose = () =>
    schoolSessionDispatch({
      type: "openAddExamsScore",
      payload: {
        open: false,
        data: {},
      },
    });
  return (
    <>
      <Dialog
        open={openExamsScore.open}
        onClose={handleClose}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle>Student Score</DialogTitle>
        <DialogContent>
          <TabContext value={tab}>
            <TabList onChange={(e, value) => setTab(value)}>
              <Tab label="Add Score" value="1" />
              <Tab label="View Score" value="2" />
            </TabList>
            <TabPanel value="1">
              <ExamsScoreInput />
            </TabPanel>
            <TabPanel value="2">
              <ExamsScoreList session={openExamsScore.data} />
            </TabPanel>
          </TabContext>
        </DialogContent>
        <DialogActions sx={{ padding: 2 }}>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <ExamsReport />
    </>
  );
}

export default ExamsScore;
