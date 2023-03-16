import React, { useState } from "react";
import { MailRounded, Message } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Container, Divider, Tab, Typography } from "@mui/material";
import SMSQuick from "./SMSQuick";
import SMSBulk from "./SMSBulk";
import Back from "../../components/Back";

const SMSNew = () => {
  const [tab, setTab] = useState("1");

  return (
    <Container>
      <Back />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          paddingY: 3,
        }}
      >
        <MailRounded color="inherit" sx={{ width: 100, height: 100 }} />

        <Typography variant="h5">SMS,Mails & Notifications</Typography>
        <Typography>
          Send single and bulk SMS to students and parents
        </Typography>
        <Divider flexItem />
      </Container>
      <TabContext value={tab}>
        <TabList onChange={(e, value) => setTab(value)}>
          <Tab
            label="Quick Message"
            value="1"
            icon={<Message />}
            iconPosition="start"
          />
          <Tab label="Bulk Messages" value="2" icon={null} />
        </TabList>
        <TabPanel value="1">
          <SMSQuick />
        </TabPanel>
        <TabPanel value="2">
          <SMSBulk />
        </TabPanel>
      </TabContext>
    </Container>
  );
};

export default SMSNew;
