import {
  DeleteRounded,
  Edit,
  MessageRounded,
  Person,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  useTheme,
} from "@mui/material";

import Swal from "sweetalert2";
import React, { useContext, useEffect, useState } from "react";
import ProfileItem from "../../components/typo/ProfileItem";
import { TeacherContext } from "../../context/providers/TeacherProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTeacher } from "../../api/teacherAPI";
import TeacherAssignLevel from "./TeacherAssignLevel";
import {
  getTeacherLevel,
  unassignTeacherLevel,
} from "../../api/currentLevelDetailAPI";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";
import {
  alertError,
  alertSuccess,
} from "../../context/actions/globalAlertActions";
import moment from "moment";

const TeacherView = () => {
  const { sessionId, termId } = JSON.parse(
    localStorage.getItem("@school_session")
  );

  const queryClient = useQueryClient();
  const [profileImage, setProfileImage] = useState(null);
  const { palette } = useTheme();
  const [openTeacherAssignLevel, setOpenTeacherAssignLevel] = useState(false);
  const [assignedLevel, setAssignedLevel] = useState({
    _id: "",
    type: "",
  });

  const {
    teacherState: { viewTeacherData },
    teacherDispatch,
  } = useContext(TeacherContext);
  const teacher = viewTeacherData?.data;

  const { schoolSessionDispatch } = useContext(SchoolSessionContext);

  useEffect(() => {
    setProfileImage(
      `${process.env.REACT_APP_BASE_NET_LOCAL}/images/teachers/${teacher?.profile}`
    );
  }, [teacher]);

  //GET Teacher assigned Level
  useQuery(
    ["teacher-level"],
    () => getTeacherLevel({ sessionId, termId, teacher: teacher?._id }),
    {
      enabled: !!sessionId && !!termId && !!teacher?._id,
      onSuccess: (level) => {
        setAssignedLevel(level);
      },
    }
  );

  //EDIT Teacher Info
  const editTeacherInfo = () => {
    teacherDispatch({
      type: "editTeacher",
      payload: {
        open: true,
        data: teacher,
      },
    });
    handleClose();
  };

  //CLOSE view Teacher Info
  const handleClose = () => {
    setAssignedLevel("");
    teacherDispatch({
      type: "viewTeacher",
      payload: {
        open: false,
        data: {},
      },
    });
  };

  //UNASSIGN Teacher from level
  const { mutateAsync: unassignTeacher } = useMutation(unassignTeacherLevel);
  const handleUnassignTeacher = () => {
    unassignTeacher(assignedLevel._id, {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["teacher-level"]);
        schoolSessionDispatch(alertSuccess(data));
      },
      onError: (error) => {
        schoolSessionDispatch(alertError(error));
      },
    });
  };

  //DELETE Teacher Info

  const { mutateAsync } = useMutation(deleteTeacher);

  const handleDelete = () => {
    Swal.fire({
      title: "Deleting Teacher",
      text: "Do you want to delete?",
      confirmButtonColor: palette.primary.main,
      showCancelButton: true,
    }).then((data) => {
      if (data.isConfirmed) {
        mutateAsync(teacher?._id, {
          onSuccess: (data) => {
            queryClient.invalidateQueries(["teachers"]);
            schoolSessionDispatch(alertSuccess(data));
            handleClose();
          },
          onError: (error) => {
            schoolSessionDispatch(alertError(error));
          },
        });
      }
    });
  };

  //OPEN Quick Message
  //CLOSE
  const openQuickMessage = () => {
    schoolSessionDispatch({
      type: "sendQuickMessage",
      payload: {
        open: true,
        data: {
          email: teacher?.email,
          phonenumber: teacher?.phonenumber,
        },
      },
    });
  };

  return (
    <>
      <Dialog
        tabIndex={-1}
        open={viewTeacherData.open}
        maxWidth="sm"
        fullWidth
        onClose={handleClose}
      >
        <DialogTitle>Teacher Information</DialogTitle>
        <DialogContent sx={{ display: "flex", justifyContent: "center" }}>
          <Box>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              width="100%"
              paddingY={2}
              gap={1}
            >
              <Avatar srcSet={profileImage} sx={{ width: 80, height: 80 }} />
              <Button
                size="small"
                startIcon={<MessageRounded />}
                onClick={openQuickMessage}
              >
                Send Message
              </Button>
              <Stack direction="row" spacing={2} flexWrap="wrap">
                <Button
                  size="small"
                  endIcon={<Person />}
                  onClick={() => setOpenTeacherAssignLevel(true)}
                >
                  Assign Level
                </Button>
                <Button
                  size="small"
                  endIcon={<Edit />}
                  onClick={editTeacherInfo}
                >
                  Edit
                </Button>
                <Button
                  color="error"
                  size="small"
                  endIcon={<DeleteRounded />}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </Stack>
            </Box>

            <Divider flexItem>
              <Chip label="Personal Information" color="primary" />
            </Divider>

            <ProfileItem
              label="Name"
              text={`${teacher?.surname} ${teacher?.firstname} ${teacher?.othername}`}
            />
            <ProfileItem
              label="Date Of Birth"
              tex
              text={moment(new Date(teacher?.dateofbirth)).format(
                "Do MMMM, YYYY."
              )}
            />
            <ProfileItem label="Gender" text={teacher?.gender} />
            <ProfileItem label="Email Address" text={teacher?.email} />
            <ProfileItem label="Telephone No." text={teacher?.phonenumber} />
            <ProfileItem label="Address" text={teacher?.address} />
            <ProfileItem label="Residence" text={teacher?.residence} />

            <ProfileItem label="Nationality" text={teacher?.nationality} />
            <Divider flexItem>
              <Chip label="Level Information" color="primary" />
            </Divider>
            {assignedLevel._id && (
              <Stack direction="row" spacing={2} width="inherit">
                <ProfileItem
                  label="Assigned Level"
                  text={assignedLevel?.type}
                />
                <Button
                  title="Unassigned from level"
                  color="error"
                  size="small"
                  endIcon={<DeleteRounded />}
                  onClick={handleUnassignTeacher}
                >
                  Remove
                </Button>
              </Stack>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <TeacherAssignLevel
        open={openTeacherAssignLevel}
        setOpen={setOpenTeacherAssignLevel}
        teacher={teacher._id}
      />
    </>
  );
};

TeacherView.propTypes = {};

export default React.memo(TeacherView);
