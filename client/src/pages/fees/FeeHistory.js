import React, { useEffect, useId, useState, useTransition } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import { useQuery } from "@tanstack/react-query";
import feeEmptyImg from "../../assets/images/empty/fees-empty2.png";
import { getStudentAllFeeHistory } from "../../api/currentFeeAPI";
import StudentFeeReportListItem from "../../components/list/StudentFeeReportListItem";
import { getAllStudentsBySession } from "../../api/currentLevelAPI";
import Scrollbars from "react-custom-scrollbars";
import _ from "lodash";
const FeeHistory = () => {
  const uniqueID = useId();
  //Get Session id
  const session = JSON.parse(localStorage.getItem("@school_session"));

  // const queryClient = useQueryClient();
  const [_isPending, startTransition] = useTransition();

  //

  const [profileImage, setProfileImage] = useState(null);
  const [currentStudentsOptions, setCurrentStudentsOptions] = useState([]);
  const [studentInfo, setStudentInfo] = useState({});
  const [searchValue, setSearchValue] = useState({
    id: "",
    profile: "",
    fullName: "",
    label: "",
    level: "",
    levelType: "",
  });

  const allStudents = useQuery(
    ["all-students", session],
    () => getAllStudentsBySession(session, "search"),
    {
      enabled: !!session.sessionId,
      onSuccess: (students) => {
        if (students.length !== 0) {
          setCurrentStudentsOptions(students);
        }
      },
    }
  );

  //Search Student
  useEffect(() => {
    startTransition(() => {
      if (searchValue?.fullName === "") {
        setStudentInfo({});
        return;
      }

      const student = currentStudentsOptions.filter(({ fullName }) => {
        return (
          fullName
            ?.toLowerCase()
            ?.lastIndexOf(searchValue?.fullName?.toLowerCase()) > -1
        );
      });
      setStudentInfo(student[0]);
    });
  }, [searchValue, currentStudentsOptions]);

  const studentFeesHistory = useQuery(
    ["all-fees-history"],
    () => getStudentAllFeeHistory(studentInfo?.id),
    {
      enabled: !!studentInfo?.id,
      onSuccess: (fees) => {
        if (!_.isEmpty(fees)) {
          setProfileImage(
            fees.profile === undefined || fees.profile === ""
              ? null
              : `${process.env.REACT_APP_BASE_NET_LOCAL}/images/students/${fees.profile}`
          );
        }
      },
    }
  );

  return (
    <Container maxWidth="md" sx={{ paddingY: 2 }}>
      <Typography variant="h5">Fees History</Typography>
      <Typography>Manage Student fee payment history</Typography>
      <Divider />
      <Stack paddingY={4}>
        {/* search */}
        <Autocomplete
          fullWidth
          disableClearable
          clearText=" "
          options={currentStudentsOptions}
          loading={allStudents.isLoading}
          loadingText="Loading Students.Please Wait..."
          noOptionsText="No Student found"
          isOptionEqualToValue={(option, value) =>
            value.id === undefined || value.id === "" || option.id === value.id
          }
          getOptionLabel={(option) => option.fullName || ""}
          value={searchValue}
          onChange={(e, value) => {
            setStudentInfo({});
            setSearchValue(value);
          }}
          sx={{ textTransform: "capitalize" }}
          renderInput={(params) => (
            <TextField
              {...params}
              // size="small"
              placeholder="Search for student"
            />
          )}
        />
      </Stack>

      {studentFeesHistory?.data !== undefined ? (
        <>
          <Stack
            justifyContent="center"
            paddingY={2}
            spacing={1}
            alignItems="center"
          >
            <Avatar src={profileImage} sx={{ width: 80, height: 80 }} />
            <Typography sx={{ textTransform: "capitalize" }}>
              {studentFeesHistory?.data?.fullName}
            </Typography>
          </Stack>
          <Scrollbars style={{ width: "100%", minHeight: "300px" }} autoHide>
            {studentFeesHistory?.data?.fees?.map((session) => (
              <StudentFeeReportListItem
                key={uniqueID}
                item={session}
                studentId={studentFeesHistory?.data?.studentId}
              />
            ))}
          </Scrollbars>
        </>
      ) : (
        <Stack spacing={2} justifyContent="center" alignItems="center">
          <Avatar src={feeEmptyImg} sx={{ width: 200, height: 200 }} />
          <Typography variant="body2">No Records available</Typography>
        </Stack>
      )}
    </Container>
  );
};

export default FeeHistory;
