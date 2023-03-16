/* eslint-disable import/no-anonymous-default-export */
import {
  sessionInitialValues,
  levelInitialValues,
  studentInitialValues,
  teacherInitialValues,
  userInitialValues,
  parentInitialValues,
  quickMessageInitialValues,
  bulkMessageInitialValues,
} from "./initialValues";
import { readCSV } from "./readCSV";
import { readXLSX } from "./readXLSX";
import { EMPTY_IMAGES } from "./images";
import { TEACHERSREMARKS, INTEREST, CONDUCT } from "./remarks";
export default {
  ///Initial values
  sessionInitialValues,
  levelInitialValues,
  studentInitialValues,
  teacherInitialValues,
  userInitialValues,
  parentInitialValues,
  quickMessageInitialValues,
  bulkMessageInitialValues,

  //Images

  EMPTY_IMAGES,

  //remarks
  TEACHERSREMARKS,
  INTEREST,
  CONDUCT,

  //


  //read file
  readCSV,
  readXLSX,
};
