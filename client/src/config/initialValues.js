
import {
  messageValidationSchema,
  onlyEmailValidationSchema,
  onlyPhoneValidationSchema,
} from "./validationSchema";

const session = JSON.parse(localStorage.getItem("@school_session"));

//session
export const sessionInitialValues = {
  from: "",
  to: "",
  term: "",
  academicYear: "",
  vacationDate: "",
  reOpeningDate: "",
};

export const levelInitialValues = {
  level: "",
  type: "",
  subjects: [],
};

//student
export const studentInitialValues = {
  profile: null,
  firstname: "",
  surname: "",
  othername: "",
  dateofbirth: "",
  gender: "",
  email: "",
  phonenumber: "",
  address: "",
  residence: "",
  nationality: "",
  level: {
    _id: "",
    type: "",
  },
  session: session,
};
//student
export const teacherInitialValues = {
  profile: null,
  firstname: "",
  surname: "",
  othername: "",
  dateofbirth: "",
  gender: "",
  email: "",
  phonenumber: "",
  address: "",
  residence: "",
  nationality: "",
};
//student
export const userInitialValues = {
  profile: null,
  fullname: "",
  username: "",
  dateofbirth: "",
  gender: "",
  role: "",
  email: "",
  phonenumber: "",
  address: "",
  residence: "",
  nationality: "",
  password: "",
  confirmPassword: "",
};

//parent
export const parentInitialValues = {
  firstname: "",
  surname: "",
  gender: "",
  email: "",
  phonenumber: "",
  address: "",
  nationality: "",
};

//sms
export const quickMessageInitialValues = (radioValue) => {
  switch (radioValue) {
    case "sms":
      return {
        init: {
          type: radioValue,
          phonenumber: "",
          title: "",
          message: "",
        },
        val: onlyPhoneValidationSchema,
      };
    case "email":
      return {
        init: {
          type: radioValue,
          title: "",
          email: "",
          message: "",
        },
        val: onlyEmailValidationSchema,
      };

    default:
      return {
        init: {
          type: radioValue,
          title: "",
          email: "",
          message: "",
          phonenumber: "",
        },
        val: messageValidationSchema,
      };
  }
};

export const bulkMessageInitialValues = {
  title: "",
  message: "",
};
