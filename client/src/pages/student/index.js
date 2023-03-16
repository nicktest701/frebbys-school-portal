import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { getAllStudentsBySession } from "../../api/currentLevelAPI";

import { StudentContext } from "../../context/providers/StudentProvider";
import StudentFooter from "./layout/StudentFooter";
import StudentNav from "./layout/StudentNav";

function Student() {
  const session = JSON.parse(localStorage.getItem("@school_session"));
  const { studentDispatch } = useContext(StudentContext);

  useQuery(
    ["all-students", session],
    () => getAllStudentsBySession(session, "all"),
    {
      enabled: !!session.sessionId,
      onSuccess: (students) => {
        studentDispatch({ type: "getAllStudents", payload: students });
      },
    }
  );

  return (
    <>
      <StudentNav />
      <section style={{ minHeight: "80vh" }}>
        <Outlet />
      </section>
      <StudentFooter />
    </>
  );
}

export default Student;
