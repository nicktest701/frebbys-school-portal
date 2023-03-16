import { Delete } from "@mui/icons-material";
import Edit from "@mui/icons-material/Edit";
import { Avatar, Box, Chip, ListItemText, Stack } from "@mui/material";
import { currencyFormatter } from "../../config/currencyFormatter";

const session = JSON.parse(localStorage.getItem("@school_session"));

export const SCHOOL_SESSION_COLUMN = (handleEdit, handleDelete) => {
  return [
    {
      field: "termId",
      title: "ID",
      hidden: true,
    },
    {
      field: "from",
      hidden: true,
    },
    {
      field: "to",
      hidden: true,
    },
    {
      field: "academicYear",
      title: "Academic Year",
    },
    {
      field: "term",
      title: "Term",
    },
    {
      field: "vacationDate",
      hidden: true,
    },
    {
      field: "reOpeningDate",
      hidden: true,
    },
    {
      field: "sessionId",
      hidden: true,
    },
    {
      field: "status",
      title: "Status",
      export: false,
      render: (rowData) =>
        rowData.termId === session?.termId ? (
          <Chip
            label="Current Session"
            sx={{ color: "white", bgcolor: "primary.main" }}
          />
        ) : null,
    },
    {
      title: "Action",
      field: null,
      render: (rowData) => {
        return (
          <Stack direction="row" spacing={3}>
            <Edit
              className="ico"
              onClick={() => handleEdit(rowData)}
              title="Edit"
              titleAccess="Edit"
            />
            <Delete
              className="ico"
              onClick={() => handleDelete(rowData?.termId)}
              title="Delete"
              titleAccess="Delete"
            />
          </Stack>
        );
      },
    },
  ];
};

export const SCHOOL_TERMS = [
  "Term 1",
  "Term 2",
  "Term 3",
  "Semester 1",
  "Semester 2",
];

export const SCHOOL_LEVELS = [
  {
    field: "_id",
    title: "ID",
    hidden: true,
  },
  {
    field: "type",
    title: "Level",
  },
  {
    field: "subjects",
    hidden: true,
  },
];

export const SCHOOL_LEVEL = [
  {
    name: "_id",
    label: "ID",
    options: {
      display: false,
    },
  },
  {
    name: "type",
    label: "Level",
  },
  {
    name: "subjects",
    options: {
      display: false,
    },
  },
];

export const SCHOOl_SUBJECTS = [
  {
    name: "_id",
    label: "ID",
    options: {
      display: false,
    },
  },
  {
    name: "title",
    label: "Subject",
  },
];

export const LEVEL_OPTIONS = [
  "Creche",
  "Nursery 1",
  "Nursery 2",
  "Kindergarten 1",
  "Kindergarten 2",
  "Basic 1",
  "Basic 2",
  "Basic 3",
  "Basic 4",
  "Basic 5",
  "Basic 6",
  "Basic 7",
  "Basic 8",
  "Basic 9",
  "J.H.S 1",
  "J.H.S 2",
  "J.H.S 3",
];
export const LEVEL_TYPE_OPTIONS = ["A", "B", "C", "D", "E", "F"];

export const SUBJECT_OPTIONS = [
  "English Language",
  "Mathematics",
  "Integrated Science",
  "Social Studies",
  "Religious & Moral Education",
  "Creative Arts & Design",
  "Career Technology",
  "Our World,Our People",
  "Computing",
  "Ghanaian Language",
  "French",
  "History",
  "Arabic",
  "Physical & Health Education",
];

export const FEES_OPTIONS = [
  "Tuition Fees",
  "Cadet Fees",
  "P.T.A Dues",
  "Accomodation Fee",
  "Boarding Fee",
];

export const FEES_COLUMNS = [
  {
    name: "_id",
    label: "ID",
    options: {
      display: false,
    },
  },
  {
    name: "level",
    label: "Level",
  },
  {
    name: "fees",
    label: "Fees",
  },
  {
    name: "amount",
    options: {
      display: false,
    },
  },
];

export const SCHOOL_FEES_COLUMNS = (handleEdit, handleDelete) => [
  {
    field: "_id",
    title: "ID",
    hidden: true,
  },
  {
    field: "level",
    title: "Level",
  },
  {
    field: "fees",
    title: "Fees",
  },
  {
    field: "amount",
    hidden: true,
  },
  {
    title: "No. Of Students",
    field: "noOfStudents",
  },
  {
    title: "Total Fees",
    field: "totalFees",
  },
  {
    title: "Action",
    field: null,
    render: (rowData) => {
      return (
        <Stack direction="row" spacing={3}>
          <Edit
            className="ico"
            onClick={() => handleEdit(rowData)}
            title="Edit"
            titleAccess="Edit"
          />
          <Delete
            className="ico"
            onClick={() => handleDelete(rowData?._id)}
            title="Delete"
            titleAccess="Delete"
          />
        </Stack>
      );
    },
  },
];

export const STUDENT_FEES_HISTORY_COLUMNS = [
  {
    field: "date",
    title: "Date of Payment",
    render: ({ date }) => (
      <ListItemText
        primary={new Date(date).toDateString()}
        secondary={new Date(date).toLocaleTimeString()}
        primaryTypographyProps={{
          fontSize: 14,
        }}
      />
    ),
  },
  {
    field: "paid",
    title: "Amount Paid",
    render: ({ paid, balance }) => currencyFormatter(paid + balance),
  },
  {
    field: "outstanding",
    title: "Remaining Fees",
    render: ({ outstanding }) => currencyFormatter(outstanding),
  },
  {
    field: "balance",
    title: "Change",
    render: ({ balance }) => currencyFormatter(balance),
  },
];

export const MESSAGE_COLUMNS = [
  {
    field: "createdAt",
    title: "Date of Issue",
    render: (rowData) => {
      const date = new Date(rowData?.createdAt).toDateString();
      const time = new Date(rowData?.createdAt).toLocaleTimeString();
      return (
        <ListItemText
          primary={date}
          primaryTypographyProps={{
            fontSize: 13,
            color: "primary.main",
          }}
          secondary={time}
          secondaryTypographyProps={{
            fontSize: 11,
          }}
        />
      );
    },
  },
  {
    field: "type",
    title: "Type",
    render: ({ type }) => {
      return type === "sms" ? (
        <Chip label="sms" color="primary" size="small" />
      ) : type === "email" ? (
        <Chip label="email" color="secondary" size="small" />
      ) : (
        <Box display="flex" columnGap={1}>
          <Chip label="sms" color="primary" size="small" />
          <Chip label="email" color="secondary" size="small" />
        </Box>
      );
    },
  },
  {
    field: "recipient",
    title: "Recipient",
    render: (rowData) => {
      if (rowData.recipient?.type === "Individual") {
        return rowData.type === "sms"
          ? rowData.recipient?.phonenumber[0]
          : rowData.type === "email"
          ? rowData.recipient?.email[0]
          : `${rowData.recipient?.phonenumber[0]}, 
             ${rowData.recipient?.email[0]}`;
      } else {
        return rowData.recipient.type;
      }
    },
  },
  {
    field: "body",
    title: "Message",
    render: ({ body }) => {
      return (
        <ListItemText
          primary={body.title}
          primaryTypographyProps={{
            fontSize: 13,
            color: "primary.main",
            fontWeight: "bold",
          }}
          secondary={body.message}
          secondaryTypographyProps={{
            fontSize: 12,
            textOverflow: `ellipsis`,
            whiteSpace: "nowrap",
            overflow: "hidden",
            maxWidth: 150,
          }}
        />
      );
    },
  },
  {
    field: "status",
    title: "Status",
    render: (rowData) => (
      <Chip
        label={rowData?.status ? "Delivered" : "Not Delivered"}
        color={rowData?.status ? "success" : "error"}
        size="small"
      />
    ),
  },
];

export const EXAMS_COLUMNS = [
  {
    field: "_id",
    title: "ID",
    hidden: true,
  },

  {
    field: "type",
    title: "Level",
  },

  {
    field: "noOfStudents",
    title: "Students",
  },
];

export const USERS_COLUMNS = [
  { title: "ID", field: "_id", hidden: true },
  {
    title: "Profile",
    field: "profile",
    export: false,
    render: (rowData) => (
      <Avatar
        src={
          rowData.profile === undefined || rowData.profile === ""
            ? null
            : `${process.env.REACT_APP_BASE_NET_LOCAL}/images/users/${rowData?.profile}`
        }
      />
    ),
  },
  {
    title: "Name",
    field: "fullname",
  },
  {
    title: "Username",
    field: "username",
  },
  {
    title: "Date Of Birth",
    field: "dateofbirth",
  },
  {
    title: "Telephone No.",
    field: "phonenumber",
  },
  {
    title: "Email Address",
    field: "email",
  },
  {
    title: "Role",
    field: "role",
  },
  {
    title: "Status",
    field: null,
    render: ({ active }) => (
      <Chip
        label={active ? "Active" : "Disabled"}
        color={active ? "success" : "error"}
        size="small"
        sx={{
          color: "#fff",
        }}
      />
    ),
  },
];
