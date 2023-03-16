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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../../api/userAPI";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";
import {
  alertError,
  alertSuccess,
} from "../../context/actions/globalAlertActions";
import moment from "moment";

const UserView = () => {
  const queryClient = useQueryClient();
  const [profileImage, setProfileImage] = useState(null);
  const { palette } = useTheme();

  const {
    schoolSessionState: { userViewData },
    schoolSessionDispatch,
  } = useContext(SchoolSessionContext);

  const user = userViewData?.data;

  useEffect(() => {
    setProfileImage(
      `${process.env.REACT_APP_BASE_NET_LOCAL}/images/users/${user?.profile}`
    );
  }, [user]);

  //EDIT User Info
  const editUserInfo = () => {
    schoolSessionDispatch({
      type: "editUser",
      payload: {
        open: true,
        data: user,
      },
    });
    handleClose();
  };

  //CLOSE view User Info
  const handleClose = () => {
    schoolSessionDispatch({
      type: "viewUser",
      payload: {
        open: false,
        data: {},
      },
    });
  };

  //DELETE User Info

  const { mutateAsync } = useMutation(deleteUser);

  const handleDelete = () => {
    Swal.fire({
      title: "Deleting User",
      text: "Do you want to delete?",
      confirmButtonColor: palette.primary.main,
      showCancelButton: true,
    }).then((data) => {
      if (data.isConfirmed) {
        mutateAsync(user?._id, {
          onSuccess: (data) => {
            queryClient.invalidateQueries(["users"]);
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
          email: user?.email,
          phonenumber: user?.phonenumber,
        },
      },
    });
  };

  return (
    <>
      <Dialog
        tabIndex={-1}
        open={userViewData.open}
        maxWidth="sm"
        fullWidth
        onClose={handleClose}
      >
        <DialogTitle>User Information</DialogTitle>
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
                <Button size="small" endIcon={<Edit />} onClick={editUserInfo}>
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

            <ProfileItem label="Name" text={`${user?.fullname}`} />
            <ProfileItem label="Username" text={`${user?.username}`} />
            <ProfileItem label="Role" text={user?.role} />
            <ProfileItem
              label="Date Of Birth"
              tex
              text={moment(new Date(user?.dateofbirth)).format(
                "Do MMMM, YYYY."
              )}
            />
            <ProfileItem label="Gender" text={user?.gender} />
            <ProfileItem label="Email Address" text={user?.email} />
            <ProfileItem label="Telephone No." text={user?.phonenumber} />
            <ProfileItem label="Address" text={user?.address} />
            <ProfileItem label="Residence" text={user?.residence} />

            <ProfileItem label="Nationality" text={user?.nationality} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

UserView.propTypes = {};

export default React.memo(UserView);
