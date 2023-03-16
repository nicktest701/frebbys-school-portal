import React, { useContext, useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import _ from "lodash";
import { StudentContext } from "../../context/providers/StudentProvider";
import avatarOne from "../../assets/images/avatars/avatar_10.png";
// import CustomizedTable from "../../components/tables/CustomizedTable";
import { studentFeesReportColumns } from "../../mockup/columns/studentColumns";
import StudentFeesReportView from "../../components/modals/StudentFeesReportView";
import { ViewColumn } from "@mui/icons-material";

const StudentFeesReport = () => {
  const { studentDispatch } = useContext(StudentContext);
  // const [totalFees, setTotalFees] = useState(0);
  // const [amountPaid, setAmountPaid] = useState(0);
  // const [outstandingFees, setOutstandingFees] = useState(0);
  const [selectedFees, setSelectedFees] = useState([]);

  // useEffect(() => {
  // const totalFeesPaid = _.sumBy(studentFeesReportData, "amountPaid");
  // }, []);

  // const handleOnRowClick = (rowData, rowState) => {
  //    const selectedItem = studentFeesReportData[rowState.dataIndex];
  //   if (!_.isEqualWith(selectedFees, selectedItem, _.isEqual)) {
  //     const newFeesList = [];
  //     newFeesList.push(selectedItem);
  //     setSelectedFees(newFeesList);
  //   }
  // };

  const handleRowChange = (currentRowsSelected, allRowsSelected) => {
    if (
      !_.isEmpty(allRowsSelected) &&
      !_.isEqualWith(
        selectedFees,
        // studentFeesReportData[allRowsSelected[0].dataIndex],
        _.isEqual
      )
    ) {
      const newFeesList = allRowsSelected
        .map
        // ({ dataIndex }) => studentFeesReportData[dataIndex]
        ();
      setSelectedFees(newFeesList);
    }
  };

  const handleToolbarSelect = () => {
    return (
      <Stack>
        <Button
          variant="contained"
          startIcon={<ViewColumn />}
          onClick={handleViewMultipleFeesReport}
        >
          View Fees Report
        </Button>
      </Stack>
    );
  };

  const handleViewSingleFeesReport = (dataIndex) => {
    studentDispatch({
      type: "showCurrentStudentFeeReportView",
      payload: {
        show: true,
        // data: new Array(studentFeesReportData[dataIndex]),
      },
    });
  };

  const handleViewMultipleFeesReport = () => {
    studentDispatch({
      type: "showCurrentStudentFeeReportView",
      payload: {
        show: true,
        data: selectedFees,
      },
    });
  };

  return (
    <Container sx={{ paddingY: 2 }}>
      {/* <Typography>{selectedFees?.amountPaid}</Typography> */}
      <div id="printPage">
        <Stack justifyContent="flex-end" direction="row">
          <Typography variant="h3">Student Fees Report</Typography>
        </Stack>
        <Divider />

        <Stack paddingY={2}>
          <Avatar src={avatarOne} sx={{ width: 80, height: 80 }} />
          <Typography variant="h5">Nana Akwasi</Typography>
          <Typography variant="body2">Class 6</Typography>
        </Stack>
        <Stack justifyContent="flex-end" direction="row">
          <Typography variant="h5">Total Fees Summary</Typography>
        </Stack>
        <Divider />

        <Stack>
          <Stack spacing={1} alignItems="flex-end" paddingY={2}>
            <Typography variant="body1">Total Fees- $292.29</Typography>
            <Typography variant="body1"> Fees Paid- $22.29</Typography>
            <Typography variant="body1"> Outstanding- $202.29</Typography>
            {/* <Typography variant="body1">
              Status <Chip label="Paid" size="medium" color="success" />
            </Typography> */}
          </Stack>
        </Stack>
      </div>

      {/* <CustomizedTable
        title="Fees Report-Term 3"
        columns={[
          ...studentFeesReportColumns,
          {
            name: "option",
            label: "option",
            options: {
              empty: true,
              customBodyRenderLite: (dataIndex) => (
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleViewSingleFeesReport(dataIndex)}
                >
                  View Fees Report
                </Button>
              ),
            },
          },
        ]}
        // data={studentFeesReportData}
        options={{
          // onRowClick: handleOnRowClick,
          onRowSelectionChange: handleRowChange,
          customToolbarSelect: handleToolbarSelect,
        }}
      /> */}

      <StudentFeesReportView />
    </Container>
  );
};

export default StudentFeesReport;
