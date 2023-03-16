import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Stack,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  TextField,
  Autocomplete,
  Alert,
  List,
  Typography,
  FormHelperText,
  InputAdornment,
  Divider,
} from "@mui/material";
import _ from "lodash";
import { Formik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoadingButton } from "@mui/lab";
import { FEES_OPTIONS } from "../../mockup/columns/sessionColumns";
import { putFee } from "../../api/feeAPI";
import FeesItem from "./FeeItem";
import { currencyFormatter } from "../../config/currencyFormatter";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";
import Transition from "../../components/animations/Transition";
const EditFee = () => {
  const queryClient = useQueryClient();

  const {
    schoolSessionState: { feeEditData },
    schoolSessionDispatch,
  } = useContext(SchoolSessionContext);

  const [fee, setFee] = useState("");
  const [feeList, setFeeList] = useState([]);
  const [amount, setAmount] = useState(0);
  const [msg, setMsg] = useState({
    severity: "",
    text: "",
  });

  useEffect(() => {
    setFeeList(feeEditData?.data?.amount);
  }, [feeEditData]);

  //ADD Fee item to list
  const handleAddFee = () => {
    if (fee === "" || amount === "") {
      return;
    }
    setFeeList((prev) => {
      return prev !== undefined
        ? _.values(
            _.merge(_.keyBy([...prev, { fee, amount: Number(amount) }], "fee"))
          )
        : [{ fee, amount: Number(amount) }];
    });

    setFee("");
    setAmount("");
  };

  //REMOVE fee item from list
  const handleRemoveFee = (searchFee) => {
    setFeeList((prev) => {
      const filteredFees = prev.filter(({ fee }) => fee !== searchFee);
      return filteredFees;
    });
  };

  const totalFees = useMemo(
    () => currencyFormatter(_.sumBy(feeList, "amount")),
    [feeList]
  );

  const { mutateAsync } = useMutation(putFee);

  const onSubmit = (values, options) => {
    setMsg({ text: "" });

    mutateAsync(
      {
        _id: values._id,
        amount: values.fee,
      },
      {
        onSettled: () => {
          queryClient.invalidateQueries(["fees"]);
          options.setSubmitting(false);
        },
        onSuccess: () => {
          setMsg({
            severity: "info",
            text: "Changes Saved!!!",
          });
        },
      }
    );
  };

  //CLOSE Edit Fees
  const handleClose = () => {
    schoolSessionDispatch({
      type: "setFeeEditData",
      payload: {
        open: false,
        data: {},
      },
    });
  };
  return (
    <Dialog
      open={feeEditData.open}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      TransitionComponent={Transition}
    >
      <DialogTitle>Edit Fees</DialogTitle>
      <Formik
        initialValues={{
          _id: feeEditData?.data?._id,
          level: feeEditData?.data?.level,
          fee: feeList,
        }}
        onSubmit={onSubmit}
        // validationSchema={feeValidationSchema}
        enableReinitialize={true}
      >
        {({ values, errors, touched, handleSubmit, isSubmitting }) => {
          return (
            <>
              {msg.text && (
                <Alert
                  sx={{
                    marginY: 1,
                  }}
                  severity={msg.severity}
                  onClose={() =>
                    setMsg({
                      text: "",
                    })
                  }
                >
                  {msg.text}
                </Alert>
              )}
              <DialogContent>
                <Stack spacing={2} paddingY={2}>
                  <TextField
                    label=" Level"
                    size="small"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={
                      feeEditData?.data?.level !== undefined
                        ? feeEditData?.data?.level
                        : ""
                    }
                  />

                  <Autocomplete
                    freeSolo
                    fullWidth
                    options={FEES_OPTIONS}
                    isOptionEqualToValue={(option, value) =>
                      value === undefined || value === "" || option === value
                    }
                    getOptionLabel={(option) => option || ""}
                    value={fee}
                    onInputChange={(e, value) => setFee(value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Fee Type"
                        size="small"
                        error={Boolean(touched?.fee && errors?.fee)}
                        helperText={
                          touched?.fee &&
                          errors?.fee &&
                          "Enter a least one fee type*"
                        }
                      />
                    )}
                  />
                  <TextField
                    type="number"
                    label="Enter Fee Amount"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">GHS</InputAdornment>
                      ),

                      endAdornment: (
                        <InputAdornment position="end">p</InputAdornment>
                      ),
                    }}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    error={Boolean(touched?.fee && errors?.fee)}
                    helperText={touched?.fee && errors?.fee && "Required*"}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleAddFee}
                  >
                    Add
                  </Button>

                  <List sx={{ maxHeight: 400 }}>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      Fees
                    </Typography>
                    {_.isEmpty(feeList) ? (
                      <Typography>No Fee Available</Typography>
                    ) : (
                      feeList.map((fee) => {
                        return (
                          <FeesItem
                            key={fee.fee}
                            data={fee}
                            removeFee={handleRemoveFee}
                          />
                        );
                      })
                    )}
                    <Divider />
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Total Fees
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {totalFees}
                      </Typography>
                    </Stack>
                  </List>
                  {errors.fee && (
                    <FormHelperText sx={{ color: "error.main" }}>
                      {errors.fee}
                    </FormHelperText>
                  )}
                </Stack>
              </DialogContent>
              <DialogActions sx={{ padding: 2 }}>
                <Button onClick={handleClose}>Cancel</Button>
                <LoadingButton
                  loading={isSubmitting}
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Save Changes
                </LoadingButton>
              </DialogActions>
            </>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default EditFee;
