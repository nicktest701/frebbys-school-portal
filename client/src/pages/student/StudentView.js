import React, { useContext, useState } from "react";

import {
  Container,
  Typography,
  Divider,
  Stack,
  Autocomplete,
  TextField,
} from "@mui/material";
import {} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { STUDENTS_COLUMN } from "../../mockup/columns/studentColumns";
import { StudentContext } from "../../context/providers/StudentProvider";
import CustomizedMaterialTable from "../../components/tables/CustomizedMaterialTable";
import useLevel from "../../components/hooks/useLevel";
import useLevelById from "../../components/hooks/useLevelById";

const StudentView = () => {
  const { studentState } = useContext(StudentContext);
  const navigate = useNavigate();

  const [currentLevel, setCurrentLevel] = useState({ _id: "", type: "" });

  //GET all current academic levels
  const { levelsOption } = useLevel();

  const { students, levelLoading } = useLevelById(currentLevel?._id);

  const handleRowClick = (rowData) => {
    const id = rowData.levelId;
    const type = rowData.levelName;
    navigate(`/student/profile/${id}/${type}/${rowData._id}`, {
      state: {
        levelId: rowData.levelId,
        levelName: rowData.levelName,
      },
    });
  };

  return (
    <Container sx={{ padding: 2 }}>
      <Typography variant="h4">Students Information</Typography>
      <Divider flexItem />
      <Stack rowGap={3} paddingY={3}>
        <Autocomplete
          disableClearable
          clearText=" "
          sx={{ width: 280 }}
          options={levelsOption}
          isOptionEqualToValue={(option, value) =>
            value._id === undefined ||
            value._id === "" ||
            option._id === value._id
          }
          getOptionLabel={(option) => option.type || ""}
          value={currentLevel}
          onChange={(e, value) => setCurrentLevel(value)}
          renderInput={(params) => (
            <TextField {...params} label="Select Class" size="small" />
          )}
        />

        <CustomizedMaterialTable
          title={currentLevel?.type || "Students"}
          search={true}
          isLoading={levelLoading}
          columns={STUDENTS_COLUMN}
          actions={[]}
          data={students.length === 0 ? studentState.allStudents : students}
          onRowClick={handleRowClick}
        />
      </Stack>
    </Container>
  );
};

StudentView.propTypes = {};

export default StudentView;
