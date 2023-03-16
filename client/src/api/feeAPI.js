import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_NET_LOCAL;

//Get all Students
export const getAllFees = async (session) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${BASE_URL}/fees/all`,
      data: session,
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

export const getFee = async (id) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${BASE_URL}/fees/${id}`,
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

export const getAllFeesByCurrentLevel = async (session) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${BASE_URL}/fees/current-level/all`,
      data: session,
    });
    return res.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};
export const getFeeForCurrentLevel = async (session, level) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${BASE_URL}/fees/current-level`,
      data: {
        ...session,
        level,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

export const postFee = async (newFee) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${BASE_URL}/fees`,
      data: newFee,
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

export const putFee = async (updatedFee) => {
  try {
    const res = await axios({
      method: "PUT",
      url: `${BASE_URL}/fees`,
      data: updatedFee,
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

export const deleteFee = async (id) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `${BASE_URL}/fees/${id}`,
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};
