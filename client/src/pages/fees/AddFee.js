import React, { useContext, useMemo, useState } from "react";
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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import LoadingButton from "@mui/lab/LoadingButton";
import { FEES_OPTIONS } from "../../mockup/columns/sessionColumns";
import { getAllFees, postFee } from "../../api/feeAPI";
import FeesItem from "./FeeItem";
import { feeValidationSchema } from "../../config/validationSchema";
import { currencyFormatter } from "../../config/currencyFormatter";
import useLevel from "../../components/hooks/useLevel";
import {
  alertError,
  alertSuccess,
} from "../../context/actions/globalAlertActions";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";
const AddFee = ({ open, setOpen }) => {
  const session = JSON.parse(localStorage.getItem("@school_session"));

  const queryClient = useQueryClient();
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const [currentLevel, setCurrentLevel] = useState({ _id: "", type: "" });
  const [allFees, setAllFees] = useState("");

  const [fee, setFee] = useState("");
  const [feeList, setFeeList] = useState([]);
  const [amount, setAmount] = useState(0);
  const [msg, setMsg] = useState({
    severity: "",
    text: "",
  });

  //Find all existing level
  const { levelsOption } = useLevel();

  useQuery(["fees"], () => getAllFees(session), {
    enabled: !!session.sessionId,
    onSuccess: (fees) => setAllFees(fees),
  });

  const initialValues = {
    level: currentLevel,
    fee: feeList,
  };

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

  const { mutateAsync } = useMutation(postFee);

  const onSubmit = (values, options) => {
    setMsg({ text: "" });

    const newValues = {
      session: session.sessionId,
      term: session.termId,
      level: values.level._id,
      levelType: values.level.type,
      amount: values.fee,
    };

    //Check if fees for class already exist
    const isLevelAvailable = allFees.find(({ _id }) => _id === newValues.level);

    if (!_.isEmpty(isLevelAvailable)) {
      setMsg({
        severity: "error",
        text: `Fees for ${newValues.levelType} already exists.Please try updating it.`,
      });
      return;
    }

    // console.log(newValues);
    mutateAsync(newValues, {
      onSettled: () => {
        queryClient.invalidateQueries(["fees"]);
        options.setSubmitting(false);
      },
      onSuccess: (data) => {
        schoolSessionDispatch(alertSuccess(data));
        setOpen(false);
      },
      onError: (error) => {
        schoolSessionDispatch(alertError(error));
      },
    });
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
      <DialogTitle>Add New Fees</DialogTitle>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={feeValidationSchema}
        enableReinitialize={true}
      >
        {({ errors, touched, handleSubmit, isSubmitting }) => {
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
                  <Autocomplete
                    fullWidth
                    options={levelsOption}
                    isOptionEqualToValue={(option, value) =>
                      value._id === undefined ||
                      value._id === "" ||
                      option._id === value._id
                    }
                    getOptionLabel={(option) => option.type || ""}
                    value={currentLevel}
                    onChange={(e, value) => setCurrentLevel(value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Level"
                        size="small"
                        error={Boolean(
                          touched?.level?.type && errors?.level?.type
                        )}
                        helperText={touched?.level?.type && errors?.level?.type}
                      />
                    )}
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
                <Button onClick={() => setOpen(false)}>Close</Button>
                <LoadingButton
                  loading={isSubmitting}
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Save
                </LoadingButton>
              </DialogActions>
            </>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default AddFee;
