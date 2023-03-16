import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_NET_LOCAL;

//Get all Students
export const getAllAttendances = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `${BASE_URL}/attendances`,
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const getAttendance = async (id, date) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${BASE_URL}/attendances/${id}`,
      params: {
        date,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const postAttendance = async (newAttendance) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${BASE_URL}/attendances`,
      data: newAttendance,
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const putAttendance = async (updatedAttendance) => {
  try {
    const res = await axios({
      method: "PUT",
      url: `${BASE_URL}/attendances`,
      data: updatedAttendance,
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const deleteAttendance = async (id) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `${BASE_URL}/attendances/${id}`,
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};
