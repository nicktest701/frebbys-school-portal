import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import TeacherAlert from "../../components/alerts/TeacherAlert";
import { TeacherContext } from "../../context/providers/TeacherProvider";
import TeacherEdit from "./TeacherEdit";
import TeacherView from "./TeacherView";

const Teacher = () => {
  const {
    teacherState: { alertData },
  } = useContext(TeacherContext);

  return (
    <>
      {alertData?.message && <TeacherAlert />}
      <Outlet />
      <TeacherView />
      <TeacherEdit />
    </>
  );
};

export default Teacher;
