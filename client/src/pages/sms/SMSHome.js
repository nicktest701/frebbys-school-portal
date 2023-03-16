import React from "react";
import { Container, Divider, Stack, Typography } from "@mui/material";
import Back from "../../components/Back";
import { MessageRounded } from "@mui/icons-material";
import SMSCards from "../../components/cards/SMSCards";
import CustomizedMaterialTable from "../../components/tables/CustomizedMaterialTable";
import { useNavigate } from "react-router-dom";
import { MESSAGE_COLUMNS } from "../../mockup/columns/sessionColumns";
import { useQuery } from "@tanstack/react-query";
import { getAllMessages } from "../../api/messageAPI";
import EmptyDataContainer from "../../components/EmptyDataContainer";
import { EMPTY_IMAGES } from "../../config/images";
const SMSHome = () => {
  const messages = useQuery(["messages"], getAllMessages);
  const navigate = useNavigate();
  return (
    <Container>
      <Back />
      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          paddingY: 3,
        }}
      >
        <Stack color="primary.main">
          <Typography variant="h5">SMS & Notifications</Typography>
          <Typography>
            Send single and bulk SMS to students and parents
          </Typography>
        </Stack>
        <MessageRounded color="inherit" sx={{ width: 50, height: 50 }} />
      </Container>

      {messages?.data?.length === 0 ? (
        <EmptyDataContainer
          buttonText="New Message"
          onClick={() => navigate("new")}
          img={EMPTY_IMAGES.sms}
        />
      ) : (
        <>
          <Container
            sx={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
              placeItems: "center",
              gap: 1,
              paddingY: 3,
            }}
          >
            <SMSCards />
            <SMSCards />
            <SMSCards />
          </Container>
          <Divider />

          <CustomizedMaterialTable
            title="Recent Messages"
            isLoading={messages.isFetching}
            columns={MESSAGE_COLUMNS}
            data={messages.data ? messages.data : []}
            actions={[]}
            showAddButton={true}
            addButtonText="New Message"
            onAddButtonClicked={() => navigate("new")}
          />
        </>
      )}
    </Container>
  );
};

export default SMSHome;
