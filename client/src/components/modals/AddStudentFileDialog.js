import React, { useContext, useEffect, useState } from "react";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import _ from "lodash";
import Swal from "sweetalert2";
import LoadingButton from "@mui/lab/LoadingButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";
import MaterialTable from "material-table";
import { tableIcons } from "../../config/tableIcons";
import { postManyStudents } from "../../api/studentAPI";
import useLevel from "../hooks/useLevel";
import {
  alertError,
  alertSuccess,
} from "../../context/actions/globalAlertActions";
import { replaceKeys } from "../../config/replaceKeys";

function AddStudentFileDialog() {
  const session = JSON.parse(localStorage.getItem("@school_session"));

  //Params
  const { palette } = useTheme();
  const queryClient = useQueryClient();

  //State
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fieldError, setFieldError] = useState("");
  const [fieldValue, setFieldValue] = useState({ _id: "", type: "" });

  const { schoolSessionState, schoolSessionDispatch } =
    useContext(SchoolSessionContext);
  const fileData = schoolSessionState.addStudentFileData;

  useEffect(() => {
    if (fileData.data.length > 0) {
      console.log(fileData);
      let modifiedColumns = fileData.columns.map((column) => {
        return {
          title: _.upperCase(column),
          field: _.camelCase(column),
        };
      });

      if (fileData.type === "previous") {
        modifiedColumns = modifiedColumns.filter((item) => {
          return (
            item.field !== "_id" &&
            item.field !== "profile" &&
            item.field !== "createdAt" &&
            item.field !== "updatedAt" &&
            item.field !== "__v"
          );
        });

        setColumns(modifiedColumns);
        setData(fileData.data);
        setIsLoading(false);
        return;
      }
      // console.log(modifiedColumns);

      const students = replaceKeys(fileData.data, modifiedColumns);

      setColumns(modifiedColumns);
      setData(students);
      setIsLoading(false);
    }
  }, [fileData]);

  //Get All levels
  const { levelsOption } = useLevel();

  //CLOSE File Dialog
  const handleCloseDialog = () => {
    Swal.fire({
      title: "Exiting",
      text: "Do you want to exit?",
      confirmButtonColor: palette.primary.main,
      showCancelButton: true,
      backdrop: false,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        schoolSessionDispatch({ type: "closeAddStudentFileDialog" });
      }
    });
  };

  const { mutateAsync } = useMutation({
    mutationFn: postManyStudents,
  });
  const handlePostStudents = () => {
    setFieldError("");
    setIsLoading(true);

    if (fieldValue._id === "") {
      setFieldError("Please select a level!");
      setIsLoading(false);
      return;
    }

    const studentInfo = {
      students: data,
      session: {
        sessionId: session.sessionId,
        termId: session.termId,
        levelId: fieldValue._id,
      },
      type: fileData.type,
    };

    Swal.fire({
      title: "Importing students",
      text: `Do you want to import students in ${fieldValue.type}?`,
      confirmButtonColor: palette.primary.main,
      showCancelButton: true,
      backdrop: false,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        mutateAsync(studentInfo, {
          onSettled: () => {
            queryClient.invalidateQueries(["all-students"]);
            setIsLoading(false);
          },
          onSuccess: (data) => {
            schoolSessionDispatch(alertSuccess(data));
            schoolSessionDispatch({ type: "closeAddStudentFileDialog" });
          },
          onError: (error) => {
            schoolSessionDispatch(alertError(error));
          },
        });
      }
      setIsLoading(false);
    });
  };

  return (
    <Dialog open={fileData.open} fullScreen fullWidth>
      <DialogTitle>Preview</DialogTitle>

      <DialogActions sx={{ paddingX: 3 }}>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <LoadingButton
          variant="contained"
          loading={isLoading}
          onClick={handlePostStudents}
        >
          Import Students
        </LoadingButton>
      </DialogActions>

      <Autocomplete
        size="small"
        options={levelsOption}
        noOptionsText="No Level available"
        getOptionLabel={(option) => option.type || ""}
        isOptionEqualToValue={(option, value) =>
          value._id === undefined ||
          value._id === "" ||
          value._id === option._id
        }
        value={fieldValue}
        onChange={(e, value) => setFieldValue(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Level"
            size="small"
            error={fieldError !== "" ? true : false}
            helperText={fieldError}
            required
            FormHelperTextProps={{
              sx: {
                color: "error.main",
              },
            }}
          />
        )}
        sx={{ width: 250, marginLeft: 3 }}
      />

      <DialogContent>
        {fileData.data?.length === 0 ? (
          <Typography>No data available</Typography>
        ) : (
          <MaterialTable
            title="Students"
            isLoading={isLoading}
            icons={tableIcons}
            columns={columns}
            data={data}
            options={{
              pageSize: 10,
              pageSizeOptions: [10, 20, 30, 50],
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default AddStudentFileDialog;
