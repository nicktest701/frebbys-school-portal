import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import moment from "moment";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import Transition from "../../components/animations/Transition";
import CustomDatePicker from "../../components/inputs/CustomDatePicker";
import CustomizedMaterialTable from "../../components/tables/CustomizedMaterialTable";
import _ from "lodash";
import { useParams } from "react-router-dom";
import useLevelById from "../../components/hooks/useLevelById";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAttendance, postAttendance } from "../../api/attendanceAPI";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";
import {
  alertError,
  alertSuccess,
} from "../../context/actions/globalAlertActions";
function NewAttendance({ open, setOpen }) {
  const { id, type } = useParams();
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  //Get Students in Current Level id
  const { students } = useLevelById(id, true);
  const [date, setDate] = useState(moment());
  const [allstudents, setAllStudents] = useState([]);
  const [attendanceList, setAttendanceList] = useState([]);
  const [isAttendancePresent, setIsAttendancePresent] = useState(false);

  //GET attendance by level id and date
  useQuery({
    queryKey: ["attendance", date],
    queryFn: () => getAttendance(id, date.format("L")),
    enabled: !!id && !!date,
    onSuccess: (attendance) => {
      if (!_.isEmpty(attendance)) {
        setIsAttendancePresent(true);
        setAttendanceList(attendance.status);
      } else {
        setIsAttendancePresent(false);
      }
    },
  });

  useEffect(() => {
    const localStudents = JSON.parse(localStorage.getItem(id.toString()));
    if (!_.isEmpty(localStudents)) {
      setAllStudents(localStudents);
      return;
    }

    if (students) {
      const modifiedStudents = students.map((stud) => {
        return {
          _id: stud?._id,
          fullName: stud?.fullName,
          status: "present",
        };
      });
      setAllStudents(modifiedStudents);
    }
  }, [students, id]);

  const handleCheckAttendance = (value, rowData) => {
    rowData.status = _.startCase(value);

    const updatedStudents = _.values(
      _.merge(_.keyBy([...allstudents, rowData], "_id"))
    );
    localStorage.setItem(id, JSON.stringify(updatedStudents));
    setAttendanceList(updatedStudents);
    setAllStudents(updatedStudents);
  };

  ///POST new Attendance
  const { mutateAsync: postAttendanceAsync } = useMutation({
    mutationFn: postAttendance,
  });

  const handleSaveAttendance = () => {
    const newAttendance = {
      level: id,
      date: date.format("L"),
      status: attendanceList.length !== 0 ? attendanceList : allstudents,
    };

    postAttendanceAsync(newAttendance, {
      onSettled: () => {},
      onSuccess: (data) => {
        alert(data);
        schoolSessionDispatch(alertSuccess(data));
        setOpen(false);
      },
      onError: (error) => {
        schoolSessionDispatch(alertError(error));
      },
    });
  };

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="md"
      TransitionComponent={Transition}
    >
      <DialogTitle>New Attendance</DialogTitle>
      <DialogActions sx={{ padding: 2 }}>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        {isAttendancePresent ? null : (
          <LoadingButton variant="contained" onClick={handleSaveAttendance}>
            Save Attendance
          </LoadingButton>
        )}
      </DialogActions>
      <DialogContent sx={{ padding: 2 }}>
        <Container>
          <Box display="flex" justifyContent="flex-start" width={280}>
            <CustomDatePicker
              label="Date of Attendance"
              date={date}
              setDate={setDate}
              disableFuture={true}
            />
          </Box>
          <CustomizedMaterialTable
            search={true}
            // isLoading={levelLoading}
            title={`Attendance History for ${type}`}
            exportFileName={`Attendance for ${type} on ${date.format(
              "dddd,Do MMMM YYYY"
            )}`}
            columns={[
              {
                field: "_id",
                title: "ID",
                hidden: true,
              },
              {
                field: "fullName",
                title: "FullName",
                export: true,
              },
              {
                field: "status",
                title: "Status",
                render: (rowData) => {
                  return isAttendancePresent ? (
                    rowData.status
                  ) : (
                    <RadioGroup
                      row
                      aria-labelledby="attendance-status"
                      name="status"
                      value={rowData?.status}
                      onChange={(e) =>
                        handleCheckAttendance(e.target.value, rowData)
                      }
                    >
                      <FormControlLabel
                        value="Present"
                        control={<Radio size="small" />}
                        label="Present"
                      />
                      <FormControlLabel
                        value="Absent"
                        control={<Radio size="small" />}
                        label="Absent"
                      />
                    </RadioGroup>
                  );
                },
                export: true,
              },
            ]}
            data={attendanceList?.length !== 0 ? attendanceList : allstudents}
            actions={[]}
          />
        </Container>
      </DialogContent>
    </Dialog>
  );
}

export default NewAttendance;
