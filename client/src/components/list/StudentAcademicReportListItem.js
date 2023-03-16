import React, { useContext } from "react";
import {
  List,
  ListSubheader,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { StudentContext } from "../../context/providers/StudentProvider";

const StudentAcademicReportListItem = ({ item }) => {
  const { studentDispatch } = useContext(StudentContext);
  const navigate = useNavigate();

  const handleViewExamsDetailsByTerm = (id) => {
    studentDispatch({
      type: "getCurrentStudentSubjects",
      payload: item[1]?.subjects,
    });

    navigate(`/student/exam/${id}`, {
      replace: true,
    });
  };
  return (
    <List
      subheader={
        <ListSubheader
          sx={{ bgcolor: "primary.main", color: "secondary.main" }}
        >
          {item[0]}
        </ListSubheader>
      }
      sx={{ paddingY: 1 }}
    >
      {item[1]?.map(({ term, _id }) => {
        return (
          <ListItemButton
            key={_id}
            onClick={() => handleViewExamsDetailsByTerm(_id)}
          >
            <ListItemText secondary={term} />
          </ListItemButton>
        );
      })}
    </List>
  );
};

export default StudentAcademicReportListItem;
