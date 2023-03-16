import React, { useContext, useRef, useState } from "react";
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
  Box,
  Link,
} from "@mui/material";
import ReactToPrint from "react-to-print";
import ExamsItem from "../../components/list/ExamsItem";
import Transition from "../../components/animations/Transition";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";
import ReportItem from "../../components/list/ReportItem";
import ReportItemUnderline from "../../components/list/ReportItemUnderline";
import AddRemarks from "../../components/modals/AddRemarks";

const ExamsReport = () => {
  const { palette } = useTheme();
  const componentRef = useRef();

  const { schoolSessionState, schoolSessionDispatch } =
    useContext(SchoolSessionContext);

  const open = schoolSessionState.viewReport.open;
  const student = schoolSessionState.viewReport.data;
  const [openRemarks, setOpenRemarks] = useState(false);

  //close dialog
  const handleClose = () => {
    schoolSessionDispatch({
      type: "closeViewReport",
    });
  };

  return (
    <>
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
                FrebbyTech International School
              </Typography>
              <Typography variant="caption">Post Office Box KS 134</Typography>
              <Typography variant="caption">Kumasi</Typography>
              <Typography
                sx={{
                  textAlign: "center",
                  textDecoration: "underline",
                  borderTop: `solid 2px ${palette.secondary.main}`,
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  width: "100%",
                  padding: "4px",
                }}
                variant="body2"
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
                sx={{ width: 70, height: 70 }}
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
                    <ReportItem
                      title="No. On Roll"
                      text={student?.rollNumber}
                    />
                    <ReportItem title="Grade" text="" />
                    <ReportItem title="Promoted" text="" />
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
                <Typography variant="h5">{student?.position}</Typography>
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
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th> Class Score (50%)</th>
                    <th> Exams Score (50%)</th>
                    <th>Total Score (100%)</th>
                    {/* <th>Position</th> */}
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
                    <th>{student?.overallScore}</th>
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
                        text={student?.comments?.conduct || "Hardworking"}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td width="50%">
                      <ReportItemUnderline
                        title="Interest"
                        text={student?.comments?.interest || "Hardworking"}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td width="100%">
                      <ReportItemUnderline
                        title="Class Teacher's Remarks"
                        text={
                          student?.comments?.teachersComments ||
                          "Excellent Performance Keep it up!"
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td width="100%">
                      <ReportItemUnderline
                        title="Headmaster's Remarks"
                        text={
                          student?.comments?.headteachersComments ||
                          "Good job done!"
                        }
                      />
                      <Link
                        className="add-remarks-btn"
                        onClick={() => setOpenRemarks(true)}
                      >
                        Add Remarks
                      </Link>
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
                    <td style={{ paddingLeft: "5px", fontSize: "13px" }}>
                      Tuition Fee
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td style={{ paddingLeft: "5px", fontSize: "13px" }}>
                      Others
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td style={{ paddingLeft: "5px", fontSize: "13px" }}>
                      Arrears
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
          <Button onClick={handleClose}>Cancel</Button>

          <ReactToPrint
            // pageStyle={
            //   'width:8.5in";min-height:11in"; margin:auto",padding:4px;'
            // }
            trigger={() => <Button variant="contained">Print Report</Button>}
            content={() => componentRef.current}
            documentTitle={student?.fullName}
          />
        </DialogActions>
      </Dialog>
      <AddRemarks
        open={openRemarks}
        setOpen={setOpenRemarks}
        id={student?._id}
      />
    </>
  );
};

export default React.memo(ExamsReport);
