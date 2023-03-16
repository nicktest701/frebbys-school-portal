import { useContext } from "react";
import { Container, Stack, Typography, useTheme } from "@mui/material";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";
import CustomizedMaterialTable from "../../components/tables/CustomizedMaterialTable";

const ExamsHome = () => {
  const { palette } = useTheme();

  //School Session
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);

  return (
    <>
      <Container>
        <Stack
          spacing={1}
          direction={{ xs: "column", sm: "row" }}
          justifyContent={{ xs: "center", sm: "space-between" }}
          alignItems="center"
        >
          <Typography variant="h5">School Session</Typography>
        </Stack>

        <CustomizedMaterialTable
          title="Levels"
          // isLoading={}
          columns={[]}
          data={[]}
          actions={[]}
          showAddButton={true}
          addButtonText="New Session"
        />
      </Container>
    </>
  );
};

export default ExamsHome;
