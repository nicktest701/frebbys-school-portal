import { useContext } from "react";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";

export default function useGlobalAlertSuccess(data) {
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);

  return schoolSessionDispatch({
    type: "showAlert",
    payload: {
      severity: "info",
      message: data,
    },
  });
}
