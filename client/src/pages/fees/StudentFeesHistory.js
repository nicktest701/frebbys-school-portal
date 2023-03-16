import React, { useContext, useRef } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { StudentContext } from "../../context/providers/StudentProvider";
import { useQuery } from "@tanstack/react-query";
import { getStudentFeeHistory } from "../../api/currentFeeAPI";
import { currencyFormatter } from "../../config/currencyFormatter";
import CustomizedMaterialTable from "../../components/tables/CustomizedMaterialTable";
import { Close } from "@mui/icons-material";
import ReactToPrint from "react-to-print";
import { STUDENT_FEES_HISTORY_COLUMNS } from "../../mockup/columns/sessionColumns";

const StudentFeesHistory = ({ open, setOpen }) => {
  const session = JSON.parse(localStorage.getItem("@school_session"));
  const { palette } = useTheme();
  const componentRef = useRef();

  const {
    studentState: { currentStudentFeeInfo },
    studentDispatch,
  } = useContext(StudentContext);

  const studentFee = useQuery(
    ["student-fee-history"],
    () =>
      getStudentFeeHistory({
        sessionId: session.sessionId,
        termId: session?.termId,
        studentId: currentStudentFeeInfo?.id,
        levelId: currentStudentFeeInfo?.level,
        feeId: currentStudentFeeInfo?.feeId,
      }),
    {
      enabled: !!currentStudentFeeInfo?.id && !!currentStudentFeeInfo?.level,
      onSuccess: (feeHistory) => {},
    }
  );

  const handleClose = () => {
    setOpen(false);
    studentDispatch({
      type: "setCurrentStudentFeeInfo",
      payload: {
        id: "",
        level: "",
      },
    });
  };

  return (
    <Dialog maxWidth="md" fullWidth open={open} onClose={handleClose}>
      <DialogTitle justifyContent="flex-end">
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogActions>
        <ReactToPrint
          pageStyle={'width:8.5in";min-height:11in"; margin:auto",padding:8px;'}
          trigger={() => <Button variant="contained">Print Report</Button>}
          content={() => componentRef.current}
        />
      </DialogActions>
      <DialogContent ref={componentRef}>
        {studentFee.isLoading && <Typography>Please Wait.....</Typography>}

        {/* school details */}
        <Stack justifyContent="center" alignItems="center">
          {/* <StyleOutlined sx={{ width: 40, height: 40 }} /> */}
          <Typography variant="h4">Frebbys International School</Typography>
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
            Fees History
          </Typography>
        </Stack>

        <Stack
          justifyContent="center"
          alignItems="center"
          paddingY={1}
          spacing={2}
        >
          <Typography sx={{ fontWeight: "bold", textTransform: "capitalize" }}>
            {studentFee?.data?.fullName}
          </Typography>
          <Avatar
            srcSet={
              studentFee?.data?.profile === undefined ||
              studentFee?.data?.profile === ""
                ? null
                : `${process.env.REACT_APP_BASE_NET_LOCAL}/images/students/${studentFee?.data?.profile}`
            }
            sx={{ width: 60, height: 60 }}
          />
          <Typography sx={{ fontWeight: "bold", textTransform: "capitalize" }}>
            {studentFee?.data?.levelType}- {studentFee?.data?.term}
          </Typography>

          <Divider />
        </Stack>

        {studentFee.isFetched && studentFee.data ? (
          <>
            <CustomizedMaterialTable
              title="Fees History"
              columns={STUDENT_FEES_HISTORY_COLUMNS}
              data={studentFee?.data?.payment}
              actions={[]}
              handleRefresh={studentFee.refetch}
              options={{
                paging: false,
                selection: false,
              }}
            />
          </>
        ) : (
          <Typography>No Fees History Found</Typography>
        )}

        <Typography>Summary</Typography>
        <Divider />
      </DialogContent>
    </Dialog>
  );
};

export default StudentFeesHistory;
