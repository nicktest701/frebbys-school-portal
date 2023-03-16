import {
  Avatar,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";

export const STUDENTS_COLUMN = [
  {
    field: "_id",
    title: "ID",
    hidden: true,
  },
  {
    field: "profile",
    title: "Avatar",
    export: false,
    render: (rowData) => (
      <Avatar
        src={
          rowData.profile === undefined || rowData.profile === ""
            ? null
            : `${process.env.REACT_APP_BASE_NET_LOCAL}/images/students/${rowData.profile}`
        }
      />
    ),
  },
  {
    field: "firstname",
    title: "First Name",
    export: false,
    hidden: true,
  },
  {
    field: "surname",
    title: "Surname",
    export: false,
    hidden: true,
  },
  {
    field: "othername",
    title: "Other Name",
    export: false,
    hidden: true,
  },
  {
    field: "fullName",
    title: "FullName",
    export: true,
  },
  {
    field: "dateofbirth",
    title: "Date Of Birth",
  },
  {
    field: "gender",
    title: "Gender",
  },
  {
    field: "email",
    title: "Email",
  },
  {
    field: "address",
    title: "Address",
    export: true,
    hidden: true,
  },
  {
    field: "residence",
    title: "Residence",
    hidden: true,
  },
  {
    field: "nationality",
    title: "Nationality",
    hidden: true,
  },
  {
    field: "levelId",
    hidden: true,
  },
  {
    field: "levelName",
    title: "Level",
    hidden: true,
    export: true,
  },
];

export const STUDENTS_ATTENDANCE_COLUMNS = [
  {
    field: "_id",
    title: "ID",
    hidden: true,
  },
  {
    field: "profile",
    title: "Avatar",
    export: false,
    render: (rowData) => (
      <Avatar
        src={
          rowData.profile === undefined || rowData.profile === ""
            ? null
            : `${process.env.REACT_APP_BASE_NET_LOCAL}/images/students/${rowData.profile}`
        }
      />
    ),
  },

  {
    field: "fullName",
    title: "FullName",
    export: true,
  },
  {
    field: "status",
    title: "Status",
    render: (rowData) => {
      return (
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel
            value="present"
            control={<Radio size="small" />}
            label="Present"
          />
          <FormControlLabel
            value="absent"
            control={<Radio size="small" />}
            label="Absent"
          />
        </RadioGroup>
      );
    },
    export: true,
  },
];
export const STUDENTS_EXAMS_COLUMN = [
  {
    field: "_id",
    title: "ID",
    hidden: true,
  },
  {
    field: "profile",
    title: "Avatar",
    export: false,
    render: (rowData) => (
      <Avatar
        src={
          rowData.profile === undefined || rowData.profile === ""
            ? null
            : `${process.env.REACT_APP_BASE_NET_LOCAL}/images/students/${rowData.profile}`
        }
      />
    ),
  },

  {
    field: "fullName",
    title: "FullName",
    export: true,
  },
  {
    field: "levelId",
    hidden: true,
  },
  {
    field: "levelName",
    title: "Level",
    hidden: true,
    export: true,
  },
];

export const studentExamsReportColumns = [
  {
    name: "subject",
    title: "Subject",
  },
  {
    name: "classScore",
    title: "Class Score",
  },
  {
    name: "examsScore",
    title: "Exams Score",
  },
  {
    name: "totalScore",
    title: "Total Score",
  },
  {
    name: "grade",
    title: "Grade",
  },
  {
    name: "remarks",
    title: "Remarks",
  },
];

export const studentFeesReportColumns = [
  {
    name: "id",
    title: "ID",
    options: {
      display: false,
    },
  },

  {
    name: "studentId",
    options: {
      display: false,
    },
  },
  {
    name: "schoolSessionId",
    options: {
      display: false,
    },
  },
  {
    name: "date",
    title: "Date Of Issue",
  },
  {
    name: "amountPaid",
    title: "Amount Paid",
  },
  {
    name: "amountOutstanding",
    title: "Outstanding Amount",
  },
  {
    name: "issuer",
    title: "Issuer",
  },
];
