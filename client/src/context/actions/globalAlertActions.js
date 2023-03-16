export const alertSuccess = (data) => {
  return {
    type: "showAlert",
    payload: {
      severity: "info",
      message: data,
    },
  };
};

export const alertError = (data) => {
  return {
    type: "showAlert",
    payload: {
      severity: "error",
      message: data,
    },
  };
};
