import { Button, Container, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { getCurrentExams } from "../../api/ExaminationAPI";
import _ from "lodash";
import CustomizedMaterialTable from "../../components/tables/CustomizedMaterialTable";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";

function ExamsScoreList({ session }) {
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);

  const examsDetails = useQuery({
    queryKey: ["exams-scores"],
    queryFn: () => getCurrentExams(session),
    enabled: !!session?.sessionId,
    onSuccess: (payload) => {
      if (!_.isEmpty(payload)) {
        schoolSessionDispatch({
          type: "setReportData",
          payload,
        });
      }
    },
  });
  const columns = [
    { field: "subject", title: "Subject" },
    { field: "classScore", title: "Class Score" },
    { field: "examsScore", title: "Exams Score" },
    { field: "totalScore", title: "Total Score" },
    { field: "grade", title: "Grade" },
    { field: "remarks", title: "Remarks" },
  ];

  //OPEN Report
  const handleOpenReport = () => {
    schoolSessionDispatch({
      type: "openViewReport",
    });
  };

  return (
    <Container>
      <Button
        variant="contained"
        disabled={_.isEmpty(examsDetails.data) ? true : false}
        sx={{
          justifySelf: "flex-end",
        }}
        onClick={handleOpenReport}
      >
        View Report
      </Button>
      <Typography textAlign="right" variant="h6">
        Overall Score - {_.sumBy(examsDetails?.data?.scores, "totalScore") ?? 0}
      </Typography>
      <CustomizedMaterialTable
        title={examsDetails?.data?.fullName || ""}
        isLoading={examsDetails.isFetching}
        columns={columns}
        data={examsDetails?.data?.scores}
        actions={[]}
        search={false}
        handleRefresh={examsDetails.refetch}
      />
    </Container>
  );
}

export default ExamsScoreList;
