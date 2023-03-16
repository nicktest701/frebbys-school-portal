import React, { useContext, useState } from "react";
import { Container, Divider, Typography, useTheme, Alert } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { deleteFee, getAllFees } from "../../api/feeAPI";
import CustomizedMaterialTable from "../../components/tables/CustomizedMaterialTable";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";
import { SCHOOL_FEES_COLUMNS } from "../../mockup/columns/sessionColumns";
import AddFee from "./AddFee";
import EditFee from "./EditFee";
import EmptyDataContainer from "../../components/EmptyDataContainer";
import { EMPTY_IMAGES } from "../../config/images";

const FeeNew = () => {
  const session = JSON.parse(localStorage.getItem("@school_session"));

  const { palette } = useTheme();
  const queryClient = useQueryClient();

  const { schoolSessionDispatch } = useContext(SchoolSessionContext);

  const [openAddFee, setOpenAddFee] = useState(false);
  const [msg, setMsg] = useState({
    severity: "",
    text: "",
  });

  const fees = useQuery(["fees"], () => getAllFees(session), {
    enabled: !!session.sessionId,
  });

  const { mutateAsync } = useMutation(deleteFee);

  const handleDeleteFee = (id) => {
    Swal.fire({
      title: "Removing",
      text: "Do you want to remove Fee?",
      confirmButtonColor: palette.primary.main,
      showCancelButton: true,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        mutateAsync(id, {
          onSettled: () => {
            queryClient.invalidateQueries(["fees"]);
          },
          onSuccess: () => {
            setMsg({
              severity: "info",
              text: "Fee has been removed successfully!!!",
            });
          },
          onError: (error) => {
            setMsg({
              severity: "error",
              text: "Error removing Fee!!!",
            });
          },
        });
      }
    });
  };

  const handleEdit = (rowData) => {
    // console.log(rowData);
    schoolSessionDispatch({
      type: "setFeeEditData",
      payload: {
        open: true,
        data: rowData,
      },
    });
  };

  return (
    <>
      <Container maxWidth="md" sx={{ paddingY: 2 }}>
        <Typography variant="h5">New Fee</Typography>
        <Typography>Add new fees for a particular level</Typography>
        <Divider />
        {fees?.data?.length === 0 ? (
          <EmptyDataContainer
            img={EMPTY_IMAGES.sms}
            message="😑 No School Fees available!.Create a new one"
            buttonText="New Fee"
            onClick={() => setOpenAddFee(true)}
          />
        ) : (
          <CustomizedMaterialTable
            title="School Fees"
            columns={SCHOOL_FEES_COLUMNS(handleEdit, handleDeleteFee)}
            data={fees.data ? fees.data : []}
            isLoading={fees.isFetching}
            actions={[]}
            search={true}
            onRowClick={null}
            showAddButton={true}
            addButtonText="New Fee"
            onAddButtonClicked={() => setOpenAddFee(true)}
          />
        )}
      </Container>
      <AddFee open={openAddFee} setOpen={setOpenAddFee} />
      <EditFee />
    </>
  );
};

export default FeeNew;
