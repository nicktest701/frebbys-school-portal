import { object, number, date, string, array, ref } from "yup";

export const sessionValidationSchema = object().shape({
  from: string().required("Required*"),
  to: string().required("Required*"),
  term: string().required("Required*"),
});

export const levelValidationSchema = object().shape({
  level: string().required("Required*"),
});

export const currentLevelValidationSchema = object().shape({
  _id: string().required("Required*"),
  type: string().required("Required*"),
});

export const studentValidationSchema = object().shape({
  firstname: string().required("Required*"),
  surname: string().required("Required*"),
  // dateofbirth: date()
  //   .required("Required*")
  //   .max(new Date(), "Date of birth cannot be in the future"),
  gender: string().required("Required*"),
  email: string().email("Invalid email address!!!"),
  phonenumber: string().matches(
    /^(\+\d{1,3})?\(?\d{3}\)?\d{3}\d{4}$/,
    "Invalid Phone number"
  ),
  address: string().required("Required*"),
  residence: string().required("Required*"),
  nationality: string().required("Required*"),
  level: object({
    type: string().required("Required*"),
  }),
});

export const studentEditValidationSchema = object().shape({
  firstname: string().required("Required*"),
  surname: string().required("Required*"),
  dateofbirth: date()
    .required("Required*")
    .max(new Date(), "Date of birth cannot be in the future"),
  gender: string().required("Required*"),
  email: string().email("Invalid email address!!!"),
  phonenumber: string().matches(
    /^(\+\d{1,3})?\(?\d{3}\)?\d{3}\d{4}$/,
    "Invalid Phone number"
  ),
  address: string().required("Required*"),
  residence: string().required("Required*"),
  nationality: string().required("Required*"),
});

export const teacherValidationSchema = object().shape({
  firstname: string().required("Required*"),
  surname: string().required("Required*"),
  // dateofbirth: date()
  //   .required("Required*")
  //   .max(new Date(), "Date of birth cannot be in the future"),
  gender: string().required("Required*"),
  email: string().email("Invalid email address!!!"),
  phonenumber: string()
    .required("Required*")
    .matches(/^(\+\d{1,3})?\(?\d{3}\)?\d{3}\d{4}$/, "Invalid Phone number"),
  address: string().required("Required*"),
  residence: string().required("Required*"),
  nationality: string().required("Required*"),
});

export const userValidationSchema = object().shape({
  fullname: string().required("Required*"),
  username: string().required("Required*"),

  // dateofbirth: date()
  //   .required("Required*")
  //   .max(new Date(), "Date of birth cannot be in the future"),
  role: string().required("Required*"),
  gender: string().required("Required*"),
  email: string().email("Invalid email address!!!"),
  phonenumber: string()
    .required("Required*")
    .matches(/^(\+\d{1,3})?\(?\d{3}\)?\d{3}\d{4}$/, "Invalid Phone number"),
  address: string().required("Required*"),
  nationality: string().required("Required*"),
  residence: string().required("Required*"),
  password: string().required("Required*"),
  confirmPassword: string()
    .required("Required*")
    .oneOf([ref("password"), null], "Passwords do not match"),
});

export const userEditValidationSchema = object().shape({
  fullname: string().required("Required*"),
  username: string().required("Required*"),

  // dateofbirth: date()
  //   .required("Required*")
  //   .max(new Date(), "Date of birth cannot be in the future"),
  role: string().required("Required*"),
  gender: string().required("Required*"),
  email: string().email("Invalid email address!!!"),
  phonenumber: string()
    .required("Required*")
    .matches(/^(\+\d{1,3})?\(?\d{3}\)?\d{3}\d{4}$/, "Invalid Phone number"),
  address: string().required("Required*"),
  nationality: string().required("Required*"),
  residence: string().required("Required*"),
});

export const parentValidationSchema = object().shape({
  firstname: string().required("Required*"),
  surname: string().required("Required*"),
  gender: string().required("Required*"),
  email: string().email("Invalid email address!!!"),
  phonenumber: string()
    .required("Required*")
    .matches(/^(\+\d{1,3})?\(?\d{3}\)?\d{3}\d{4}$/, "Invalid Phone number"),
  address: string().required("Required*"),
  nationality: string().required("Required*"),
});

export const feeValidationSchema = object().shape({
  level: object({
    _id: string().required("Required*"),
    type: string().required("Required*"),
  }),
  fee: array().required("Required*").min(1, "Fee list Cannot be empty"),
});

export const messageValidationSchema = object().shape({
  email: string().required("Required*").email("Invalid email address!!!"),
  phonenumber: string()
    .required("Required*")
    .matches(/^(\+\d{1,3})?\(?\d{3}\)?\d{3}\d{4}$/, "Invalid Phone number"),
  title: string().required("Required*"),
  message: string().required("Required*"),
});

export const onlyEmailValidationSchema = object().shape({
  email: string().required("Required*").email("Invalid email address!!!"),
  title: string().required("Required*"),
  message: string().required("Required*"),
});

export const onlyPhoneValidationSchema = object().shape({
  phonenumber: string()
    .required("Required*")
    .matches(/^(\+\d{1,3})?\(?\d{3}\)?\d{3}\d{4}$/, "Invalid Phone number"),
  title: string().required("Required*"),
  message: string().required("Required*"),
});

export const bulksmsValidationSchema = object().shape({
  title: string().required("Required*"),
  message: string().required("Required*"),
});

export const quickMessageValidationSchema = object().shape({
  title: string().required("Required*"),
  message: string().required("Required*"),
});

export const examsScoreValidationSchema = object().shape({
  subject: string().required("Subject is Required*").nullable(true),
  classScore: number()
    .required("Subject is Required*")
    .min(0, "Class Score should be between 0-50")
    .max(50, "Class Score should be between 0-50"),
  examsScore: number()
    .required("Subject is Required*")
    .min(0, "Exams Score should be between 0-50")
    .max(50, "Exams Score should be between 0-50"),
});
