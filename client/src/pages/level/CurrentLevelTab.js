import { Container, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { STUDENTS_COLUMN } from "../../mockup/columns/studentColumns";
import CustomizedMaterialTable from "../../components/tables/CustomizedMaterialTable";
import { EMPTY_IMAGES } from "../../config/images";
import EmptyDataContainer from "../../components/EmptyDataContainer";
import FileDialog from "../../components/modals/FileDialog";
import useLevelById from "../../components/hooks/useLevelById";

import SummarizeRoundedIcon from "@mui/icons-material/SummarizeRounded";
import { useEffect, useState } from "react";
import NewAttendance from "./NewAttendance";
const CurrentLevelTab = () => {
  const navigate = useNavigate();
  const { id, type } = useParams();
  const [openAttendance, setOpenAttendance] = useState(false);

  //Get Students in Current Level id
  const { students, rollNumber, levelLoading } = useLevelById(id, true);

  useEffect(() => {
    if (students) {
      const modifiedStudents = students.map((stud) => {
        return {
          _id: stud?._id,
          profile: stud?.profile,
          fullName: stud?.fullName,
          status: "present",
        };
      });

      localStorage.setItem(id, JSON.stringify(modifiedStudents));
    }
  }, [id, students]);

  //Go to student profile
  const handleGotoNewStudent = () => {
    navigate(`/level/student/new`, {
      state: {
        id,
        type,
      },
    });
  };

  //Go to student profile
  const handleGotoStudentProfile = (rowData) => {
    const id = rowData.levelId;
    const type = rowData.levelName;
    navigate(`/student/profile/${id}/${type}/${rowData._id}`, {
      state: {
        id,
        type,
      },
    });
  };

  const newAttendanceAction = {
    icon: () => <SummarizeRoundedIcon />,
    position: "toolbar",
    tooltip: "New Attendance",
    onClick: (e, data) => setOpenAttendance(true),
    isFreeAction: true,
  };

  return (
    <>
      <Container>
        <Stack
          spacing={1}
          direction={{ xs: "column", sm: "row" }}
          justifyContent={{ xs: "center", sm: "space-between" }}
          alignItems="center"
        >
          <Typography variant="h5">{type}</Typography>
        </Stack>
        {students?.length === 0 ? (
          <EmptyDataContainer
            img={EMPTY_IMAGES.student}
            message="😑 No Student available.Add your first student to this level"
            buttonText="New Student"
            // onClick={handleGotoNewStudent}
          />
        ) : (
          <CustomizedMaterialTable
            search={true}
            isLoading={levelLoading}
            title={`Roll Number- ${rollNumber}`}
            columns={STUDENTS_COLUMN}
            data={students}
            actions={[newAttendanceAction]}
            // showImportButton={true}
            // importButtonText="Import Students"
            onRowClick={handleGotoStudentProfile}
          />
        )}
      </Container>
      <NewAttendance
        open={openAttendance}
        setOpen={setOpenAttendance}
        student={students}
      />
      <FileDialog />
    </>
  );
};

export default CurrentLevelTab;
