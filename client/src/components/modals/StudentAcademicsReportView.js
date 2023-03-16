import React, { useContext, useRef } from "react";
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
  Avatar,
} from "@mui/material";
import { StudentContext } from "../../context/providers/StudentProvider";
import ReactToPrint from "react-to-print";
import _ from "lodash";
import ExamsItem from "../list/ExamsItem";
import { Box } from "@mui/system";
import ReportItem from "../list/ReportItem";
import ReportItemUnderline from "../list/ReportItemUnderline";
import Transition from "../../components/animations/Transition";

const StudentAcademicsReportView = () => {
  const { palette } = useTheme();
  const componentRef = useRef();

  const { studentState, studentDispatch } = useContext(StudentContext);

  const open = studentState.showCurrentStudentAcademicsReportView.show;
  const student =
    studentState.showCurrentStudentAcademicsReportView.examsDetails;

  //close dialog
  const handleClose = () => {
    studentDispatch({
      type: "showCurrentStudentAcademicsReportView",
      payload: {
        show: false,
        examsDetails: {},
      },
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      TransitionComponent={Transition}
    >
      <DialogTitle>Report Card</DialogTitle>
      <DialogContent ref={componentRef}>
        <Divider />

        <Stack spacing={1}>
          {/* school details */}
          <Stack justifyContent="center" alignItems="center">
            {/* <StyleOutlined sx={{ width: 40, height: 40 }} /> */}
            <Typography variant="h4">
              Christ Goodness International School
            </Typography>
            <Typography sx={{ fontSize: "14px" }}>
              Post Office Box KS 134
            </Typography>
            <Typography sx={{ fontSize: "14px" }}>Kumasi</Typography>
            <Typography
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
              Report Card
            </Typography>
          </Stack>

          {/* avatar */}
          <Stack justifyContent="center" alignItems="center">
            <Avatar
              src={
                student?.profile === "" ||
                student?.profile === undefined ||
                student?.profile === null
                  ? null
                  : `${process.env.REACT_APP_BASE_NET_LOCAL}/images/students/${student?.profile}`
              }
              sx={{ width: 65, height: 65 }}
            />
          </Stack>

          {/* name section */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <table>
                <tbody>
                  <ReportItem title="Full Name" text={student?.fullName} />
                  <ReportItem title="Class" text={`${student?.level}`} />
                  <ReportItem title="No. On Roll" text={student?.rollNumber} />
                  <ReportItem title="Grade" text="35" />
                  <ReportItem title="Promoted" text="Six(6)" />
                </tbody>
              </table>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                alignItems: "center",
                textAlign: "center",
                paddingRight: 4,
              }}
            >
              <p>Position</p>
              <Typography variant="h5">6</Typography>
            </Box>
            <Box>
              <table>
                <tbody>
                  <ReportItem
                    title="Academic Year"
                    text={student?.academicYear}
                  />
                  <ReportItem title="Term" text={student?.term} />
                  <ReportItem
                    title="Vacation Date"
                    text={student?.vacationDate}
                  />
                  <ReportItem
                    title="Reopening Date"
                    text={student?.reOpeningDate}
                  />
                </tbody>
              </table>
            </Box>
          </Box>

          {/* results section */}
          <Stack>
            <table
              style={{ textAlign: "center", borderCollapse: "collapse" }}
              border="1"
            >
              <thead
                style={{
                  bgcolor: `primary.main`,
                  color: `secondary.main`,
                }}
              >
                <tr>
                  <th>Subject</th>
                  <th> Class Score (50%)</th>
                  <th> Exams Score (50%)</th>
                  <th>Total Score (100%)</th>
                  <th>Position</th>
                  <th>Grade</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {student?.scores !== undefined ? (
                  student?.scores.length !== 0 &&
                  student?.scores.map((item) => (
                    <ExamsItem key={item.subject} item={item} />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      style={{ padding: "3px 1px", fontSize: "20px" }}
                    >
                      No Student Record Available
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot
                style={{
                  textAlign: "center",
                  textDecoration: "underline",
                  borderTop: `solid 5px ${palette.secondary.main}`,
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  width: "100%",
                  padding: 1,
                }}
              >
                <tr>
                  <th>Overall Score</th>
                  <th></th>
                  <th></th>
                  <th>{_.sumBy(student?.scores, "totalScore")}</th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
          </Stack>

          {/* conduct */}
          <Box>
            <table width="100%">
              <tbody>
                <tr>
                  <td
                    width="100%"
                    style={{
                      display: "flex",
                      gap: "10px",
                      justifyContent: "flex-end",
                    }}
                  >
                    <ReportItem title="Attendance" text="11" />
                    <ReportItem
                      title="Out Of"
                      text={student?.totalLevelAttendance}
                    />
                  </td>
                </tr>
                <tr>
                  <td width="50%">
                    <ReportItemUnderline
                      title="Conduct & Attitude"
                      text="Hardworking"
                    />
                  </td>
                </tr>
                <tr>
                  <td width="50%">
                    <ReportItemUnderline title="Interest" text="Hardworking" />
                  </td>
                </tr>
                <tr>
                  <td width="100%">
                    <ReportItemUnderline
                      title="Class Teacher's Remarks"
                      text="Excellent Performance Keep it up!"
                    />
                  </td>
                </tr>
                <tr>
                  <td width="100%">
                    <ReportItemUnderline
                      title="Headmaster's Remarks"
                      text="Proud of her performance."
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </Box>
          <Divider />
          <Stack justifyContent="center" alignItems="center">
            <Typography>Bill</Typography>
            <table
              width="60%"
              border="1"
              style={{ borderCollapse: "collapse" }}
            >
              <thead>
                <tr>
                  <th>Item</th>
                  <th>GHS</th>
                  <th>GHP</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ paddingLeft: "5px", fontSize: "14px" }}>
                    Tuition Fee
                  </td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "5px", fontSize: "14px" }}>
                    Others
                  </td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "5px", fontSize: "14px" }}>
                    Arreas
                  </td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th>Total</th>
                  <th></th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
          </Stack>
          <Typography
            style={{
              fontSize: "10px",
              fontStyle: "italic",
            }}
          >
            Powered by FrebbyTech Consults (0543772591)
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button sx={{ displayPrint: false }}>Ok</Button>

        <ReactToPrint
          pageStyle={'width:8.5in";min-height:11in"; margin:auto",padding:8px;'}
          trigger={() => <Button variant="contained">Print Report</Button>}
          content={() => componentRef.current}
        />
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(StudentAcademicsReportView);
