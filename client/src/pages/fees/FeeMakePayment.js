import { Check, MonetizationOnRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Autocomplete,
  Avatar,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { useFormik } from "formik";
import _ from "lodash";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllStudentsForSearch } from "../../api/studentAPI";
import StudentFeeSkeleton from "../../components/skeleton/StudentFeeSkeleton";
import { getAllFeesByCurrentLevel } from "../../api/feeAPI";
import {
  getCurrentFeeForStudent,
  postCurrentFee,
} from "../../api/currentFeeAPI";
import { currencyFormatter } from "../../config/currencyFormatter";
import { StudentContext } from "../../context/providers/StudentProvider";
import StudentFeesHistory from "./StudentFeesHistory";
import { Link } from "react-router-dom";
const FeeMakePayment = () => {
  //

  //Get Session id
  const session = JSON.parse(localStorage.getItem("@school_session"));

  const { studentDispatch } = useContext(StudentContext);
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();

  //States
  const [msg, setMsg] = useState({ severity: "", text: "" });
  const [openFeesHistory, setOpenFeesHistory] = useState(false);
  const [studentInfo, setStudentInfo] = useState({});
  const [levelOption, setLevelOption] = useState([]);
  const [currentLevel, setCurrentLevel] = useState({
    levelId: "",
    levelType: "",
    feesId: "",
    fees: 0,
  });
  const [currentStudents, setCurrentStudents] = useState([]);
  const [searchValue, setSearchValue] = useState({
    id: "",
    profile: "",
    fullName: "",
    label: "",
    level: "",
    levelType: "",
  });

  //fee info
  const [totalFees, setTotalFees] = useState(Number(0));
  const [currentFeesPaid, setCurrentFeesPaid] = useState(Number(0));
  const [totalArreas, setTotalArreas] = useState(Number(0));
  const [totalAmountPaid, setTotalAmountPaid] = useState(Number(0));
  const [currentAmount, setCurrentAmount] = useState(Number(0));

  useQuery(
    ["all-level-fees"],
    () =>
      getAllFeesByCurrentLevel({
        session: session.sessionId,
        term: session.termId,
      }),
    {
      onSuccess: (fees) => {
        setLevelOption(fees);
      },
    }
  );

  useEffect(() => {
    setCurrentStudents([]);
    setSearchValue({
      id: "",
      profile: "",
      fullName: "",
      label: "",
      level: "",
      levelType: "",
    });
    setStudentInfo({});
  }, [currentLevel]);

  //Get All Students for search
  useQuery(
    ["all-students-for-search", currentLevel?.levelId],
    () =>
      getAllStudentsForSearch({
        session: session.sessionId,
        term: session.termId,
        level: currentLevel.levelId,
      }),
    {
      enabled: !!currentLevel?.levelId,
      onSuccess: (students) => {
        if (students.length === 0) {
          setCurrentStudents([]);
          return;
        }
        setCurrentStudents(students);
      },
    }
  );

  //Search Student
  useEffect(() => {
    startTransition(() => {
      if (searchValue?.fullName === "") {
        setStudentInfo({});
        return;
      }

      const student = currentStudents.filter(({ fullName }) => {
        return (
          fullName
            ?.toLowerCase()
            ?.lastIndexOf(searchValue?.fullName?.toLowerCase()) > -1
        );
      });
      setStudentInfo(student[0]);
    });
  }, [searchValue, currentStudents]);

  ///Get Student fees info
  useQuery(
    ["student-fees",studentInfo?.id ,studentInfo?.level],
    () =>
      getCurrentFeeForStudent({
        session: session.sessionId,
        term: session.termId,
        student: studentInfo?.id,
        level: studentInfo?.level,
      }),
    {
      enabled: !!studentInfo?.id && !!studentInfo?.level,
      onSuccess: (data) => {
        setTotalAmountPaid(data?.totalAmountPaid);
        setTotalArreas(data?.totalArreas);
        setCurrentFeesPaid(data?.current?.amountPaid || 0);
        setTotalFees(data?.totalFees);
      },
    }
  );

  //Calculate total fees to pay
  const totalFeesToBePaid = useMemo(() => {
    const toBePaid = currentLevel?.fees + totalArreas;

    return toBePaid;
  }, [totalArreas, currentLevel?.fees]);

  //Calculate outstanding Fees
  const totalOutStanding = useMemo(() => {
    const remainingFees = totalFeesToBePaid - currentFeesPaid;

    return remainingFees;
  }, [currentFeesPaid, totalFeesToBePaid]);

  //Total fees calculations
  const feeCalculation = useMemo(() => {
    //ADD total fees to arreas

    const remainingFees = totalFees - (totalAmountPaid + Number(currentAmount));

    if (remainingFees < 0) {
      return {
        date: new Date().toISOString(),
        paid: totalOutStanding,
        outstanding: Number(0),
        balance: Math.abs(remainingFees),
      };
    }

    return {
      date: new Date().toISOString(),
      paid: currentAmount,
      outstanding: remainingFees,
      balance: 0,
    };
  }, [currentAmount, totalOutStanding, totalAmountPaid, totalFees]);

  //Add fees to database
  const { mutateAsync } = useMutation(postCurrentFee);

  function onSubmit(values, options) {
    const payment = {
      session: session.sessionId,
      term: session.termId,
      level: studentInfo?.level,
      student: studentInfo?.id,
      fee: currentLevel?.feesId,
      payment: [feeCalculation],
    };

    mutateAsync(payment, {
      onSettled: () => {
        queryClient.invalidateQueries(["student-fees"]);
      },
      onSuccess: (fees) => {
        setMsg({ severity: "info", text: "Payment made successfully!!!" });
        console.log(fees);
      },
    });
    options.setSubmitting(false);
  }

  //forms
  const formik = useFormik({
    initialValues: { amount: {} },
    enableReinitialize: true,
    onSubmit: onSubmit,
  });

  //View Student Current fee info
  const handleViewStudentFeeHistory = () => {
    studentDispatch({
      type: "setCurrentStudentFeeInfo",
      payload: {
        id: studentInfo?.id,
        level: studentInfo?.level,
      },
    });
    setOpenFeesHistory(true);
  };

  return (
    <Container sx={{ paddingY: 2 }} maxWidth="md">
      <Typography variant="h5">Fees Payment</Typography>
      <Divider />
      <Stack paddingY={4} spacing={2}>
        <Stack
          direction={{ xs: "column-reverse", sm: "row" }}
          justifyContent={{ xs: "center", sm: "space-between" }}
          alignItems="center"
        >
          <Autocomplete
            sx={{ width: 250 }}
            fullWidth
            options={levelOption}
            disableClearable
            closeText=" "
            noOptionsText="No Level Available"
            isOptionEqualToValue={(option, value) =>
              value.levelId === undefined ||
              value.levelId === "" ||
              option.levelId === value.levelId
            }
            getOptionLabel={(option) => option.levelType || ""}
            value={currentLevel}
            onChange={(e, value) => {
              setCurrentLevel(value);
              setCurrentStudents([]);
            }}
            onClose={() => {
              setSearchValue({});
              setStudentInfo({});
            }}
            renderInput={(params) => (
              <TextField {...params} label="Select Level" size="small" />
            )}
          />
          <TextField
            InputProps={{
              readOnly: true,
            }}
            defaultValue="2021/2022,Term 3"
            size="small"
          />
        </Stack>

        {/* search */}
        <Autocomplete
          fullWidth
          options={currentStudents}
          disableClearable
          closeText=" "
          noOptionsText="No Student found"
          isOptionEqualToValue={(option, value) =>
            value.id === undefined || value.id === "" || option.id === value.id
          }
          getOptionLabel={(option) => option.fullName || ""}
          value={searchValue}
          onChange={(e, value) => {
            setStudentInfo({});
            setSearchValue(value);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              // size="small"
              placeholder="Search for student"
            />
          )}
        />
      </Stack>

      <Grid container spacing={4} paddingY={2}>
        {isPending ? (
          <Grid item xs={12} md={6} paddingY={4}>
            <StudentFeeSkeleton />
          </Grid>
        ) : (
          <Grid item xs={12} md={6} paddingY={4}>
            <Typography variant="h6">Personal Details</Typography>
            <Divider />

            <Stack
              spacing={1}
              justifyContent="center"
              alignItems="center"
              paddingY={2}
            >
              <Avatar
                src={
                  studentInfo?.profile === undefined ||
                  studentInfo?.profile === ""
                    ? null
                    : `${process.env.REACT_APP_BASE_NET_LOCAL}/images/students/${studentInfo?.profile}`
                }
                sx={{ width: 80, height: 80 }}
              />
            </Stack>
            <Stack spacing={2} paddingY={2}>
              <TextField
                size="small"
                label="Student's Name"
                InputProps={{
                  readOnly: true,
                }}
                value={studentInfo?.fullName || ""}
              />

              <TextField
                size="small"
                label="Level"
                value={studentInfo?.levelType || ""}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Stack>
          </Grid>
        )}

        <Grid item xs={12} md={6} paddingY={2}>
          <Typography variant="h6">Fees Details</Typography>
          <Divider />
          <Paper elevation={1} sx={{ marginTop: 2 }}>
            <Stack spacing={2} padding={2}>
              <Button
                variant="outlined"
                size="small"
                onClick={handleViewStudentFeeHistory}
                disabled={_.isEmpty(studentInfo) ? true : false}
              >
                View Payment History
              </Button>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h5">Fees</Typography>
                {!_.isEmpty(studentInfo) && totalOutStanding === 0 ? (
                  <Chip
                    label="Full Payment"
                    color="success"
                    size="medium"
                    sx={{ color: "white" }}
                    icon={<Check />}
                  />
                ) : null}
              </Stack>
              {msg.text && (
                <Alert severity={msg.severity}>
                  {msg.text}

                  {msg.text.startsWith("No") && (
                    <Link to="/fee/new">Add New Fee</Link>
                  )}
                </Alert>
              )}
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="body2">Fees For Term</Typography>
                <Typography>
                  {_.isEmpty(studentInfo)
                    ? "GHS 0.00"
                    : currencyFormatter(currentLevel?.fees || 0)}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="body2">Arreas </Typography>
                <Typography>{currencyFormatter(totalArreas)}</Typography>
              </Stack>
              <Divider flexItem />
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h5">Total </Typography>
                <Typography>
                  {_.isEmpty(studentInfo)
                    ? "GHS 0.00"
                    : currencyFormatter(totalFeesToBePaid)}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h5">Fees Paid </Typography>
                <Typography>
                  {_.isEmpty(studentInfo)
                    ? "GHS 0.00"
                    : currencyFormatter(currentFeesPaid)}
                </Typography>
              </Stack>
              <Divider flexItem />
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h5">Outstanding Fees </Typography>
                <Typography>
                  {_.isEmpty(studentInfo)
                    ? "GHS 0.00"
                    : currencyFormatter(totalOutStanding)}
                </Typography>
              </Stack>
            </Stack>
          </Paper>
          <Stack spacing={2} paddingY={2}>
            <TextField
              type="number"
              label="Amount"
              placeholder="Enter Amount here"
              value={currentAmount}
              onChange={(e) => setCurrentAmount(e.target.valueAsNumber)}
              error={formik.errors.amount}
              helperText={formik.touched.amount && formik.errors.amount}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">GHS</InputAdornment>
                ),
                endAdornment: <InputAdornment position="end">p</InputAdornment>,
              }}
            />
          </Stack>
        </Grid>
      </Grid>
      <Divider />
      <Stack direction="row" justifyContent="flex-end" paddingY={1} spacing={2}>
        <Button>Cancel</Button>
        <LoadingButton
          disabled={_.isEmpty(studentInfo) ? true : false}
          variant="contained"
          startIcon={<MonetizationOnRounded />}
          loading={formik.isSubmitting}
          onClick={formik.handleSubmit}
        >
          Make Payment
        </LoadingButton>
      </Stack>
      {/*View  Student fee History */}
      <StudentFeesHistory open={openFeesHistory} setOpen={setOpenFeesHistory} />
    </Container>
  );
};

export default FeeMakePayment;
