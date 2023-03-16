import { Avatar } from "@mui/material";

export const TEACHERS_COLUMN = [
  {
    field: "_id",
    label: "ID",
    hidden: true,
  },
  {
    field: "profile",
    label: "Profile",
    export: false,
    render: (rowData) => (
      <Avatar
        src={
          rowData.profile === undefined || rowData.profile === ""
            ? null
            : `${process.env.REACT_APP_BASE_NET_LOCAL}/images/teachers/${rowData.profile}`
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
    field: "phonenumber",
    title: "Telephone No.",
  },
  {
    field: "address",
    title: "Address",
    export: true,
  },
  {
    field: "residence",
    title: "Residence",
  },
  {
    field: "nationality",
    title: "Nationality",
    hidden: true,
  },
];
