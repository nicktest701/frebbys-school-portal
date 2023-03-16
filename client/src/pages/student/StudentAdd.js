import React, { useState } from "react";
import { Alert, Container } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import StudentInfo from "./tab/StudentInfo";
import ParentInfo from "./tab/ParentInfo";
import AnimatedContainer from "../../components/animations/AnimatedContainer";
import AddStudentFileDialog from "../../components/modals/AddStudentFileDialog";


const StudentAdd = () => {
  const [tab, setTab] = useState("1");

  const [msg, setMsg] = useState({
    severity: "",
    text: "",
  });

  return (
    <>
      {msg.text && (
        <Alert severity={msg.severity} onClose={() => setMsg({ text: "" })}>
          {msg.text}
        </Alert>
      )}
      <Container>
        <TabContext value={tab}>
          <TabPanel value="1">
            <AnimatedContainer>
              <StudentInfo setTab={setTab} msg={msg} setMsg={setMsg} />
            </AnimatedContainer>
          </TabPanel>
          <TabPanel value="2">
            <AnimatedContainer>
              <ParentInfo setTab={setTab} msg={msg} setMsg={setMsg} />
            </AnimatedContainer>
          </TabPanel>
        </TabContext>
      </Container>
      <AddStudentFileDialog />
 
    </>
  );
};

StudentAdd.propTypes = {};

export default StudentAdd;
