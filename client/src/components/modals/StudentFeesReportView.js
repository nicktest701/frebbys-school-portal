import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Typography,
  Button,
  Divider,
  useTheme,
  Slide,
} from "@mui/material";
import { StudentContext } from "../../context/providers/StudentProvider";
import ReactToPrint from "react-to-print";
import { StyleOutlined } from "@mui/icons-material";
import _ from "lodash";
import FeesItem from "../list/FeesItem";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StudentFeesReportView = () => {
  const { palette } = useTheme();
  const componentRef = useRef();
  const { studentState, studentDispatch } = useContext(StudentContext);
  const open = studentState.showCurrentStudentFeeReportView.show;
  const selectedFees = studentState.showCurrentStudentFeeReportView.data;

  //
  const [schoolSession, setSchoolSession] = useState({
    term: "",
    academicYear: "",
  });

  useEffect(() => {
    const session = localStorage.getItem("@school_session");
    if (!_.isEmpty(JSON.parse(session))) {
      setSchoolSession(JSON.parse(session));
    }
  }, []);

  //close dialog
  const handleClose = () => {
    studentDispatch({
      type: "showCurrentStudentFeeReportView",
      payload: {
        show: false,
        data: [],
      },
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      TransitionComponent={Transition}
    >
      <DialogTitle>Fees Report for 22nd Nov,2022</DialogTitle>
      <DialogContent ref={componentRef}>
        <Divider />

        <Stack>
          <Stack justifyContent="center" alignItems="center">
            <StyleOutlined sx={{ width: 40, height: 40 }} />
            <Typography variant="h4">
              Christ Goodness International School
            </Typography>
            <Typography>Post Office Box KS 134</Typography>
            <Typography>Kumasi</Typography>
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
              Fees Receipt
            </Typography>

            <Divider flexItem />
          </Stack>
          <Typography sx={{ textAlign: "right" }}>
            {schoolSession.academicYear},Term {schoolSession.term}
          </Typography>
          {selectedFees.length !== 0 &&
            selectedFees.map((item) => <FeesItem key={item.id} item={item} />)}
          <Divider />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button sx={{ displayPrint: false }}>Ok</Button>

        <ReactToPrint
          pageStyle={
            'width:8.5in";min-height:11in"; margin:auto",padding:16px;'
          }
          trigger={() => <Button variant="contained">Print Report</Button>}
          content={() => componentRef.current}
        />
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(StudentFeesReportView);
