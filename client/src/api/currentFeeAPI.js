import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_NET_LOCAL;

//Get all Students
export const getAllCurrentFees = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `${BASE_URL}/current-fees`,
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const getCurrentFee = async (session, level) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${BASE_URL}/current-fees/current-level`,
      data: {
        ...session,
        level,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const getCurrentFeeForStudent = async (info) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${BASE_URL}/current-fees/student`,
      data: info,
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const getStudentAllFeeHistory = async (student) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${BASE_URL}/current-fees/history/all`,
      params: {
        student,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};
export const getStudentFeeHistory = async (info) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${BASE_URL}/current-fees/history`,
      data: info,
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const postCurrentFee = async (newCurrentFee) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${BASE_URL}/current-fees`,
      data: newCurrentFee,
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const putCurrentFee = async (updatedCurrentFee) => {
  try {
    const res = await axios({
      method: "PUT",
      url: `${BASE_URL}/current-fees`,
      data: updatedCurrentFee,
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const deleteCurrentFee = async (id) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `${BASE_URL}/fees/${id}`,
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};
