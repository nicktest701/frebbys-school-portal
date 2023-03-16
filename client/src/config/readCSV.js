import papaparse from "papaparse";
export const readCSV = (result) => {
  return papaparse.parse(result, {
    header: true,
    skipEmptyLines: "greedy",
  }).data
};
