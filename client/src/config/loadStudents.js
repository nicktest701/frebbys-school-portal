import { readCSV } from "./readCSV.js";
import { readXLSX } from "./readXLSX";

const CSV_FILE_TYPE = "text/csv";
const XLSX_FILE_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
const XLS_FILE_TYPE = "application/vnd.ms-excel";

export function handleLoadFile(e) {
  const files = e.target.files[0];

  try {
    var students = [];
    let reader = new FileReader();
    files.type === CSV_FILE_TYPE
      ? reader.readAsBinaryString(files)
      : reader.readAsArrayBuffer(files);

    reader.onload = function (event) {
      if (files.type === XLSX_FILE_TYPE || files.type === XLS_FILE_TYPE) {
        students = readXLSX(event.target.result);
      }

      if (files.type === CSV_FILE_TYPE) {
        students = readCSV(event.target.result);
      }

    };
    return students;
  } catch (error) {
    console.log(error.message);
  }
}
