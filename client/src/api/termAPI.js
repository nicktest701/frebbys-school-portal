import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_NET_LOCAL;

//Get all Students
export const getAllTerms = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `${BASE_URL}/terms`,
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

export const getTerm = async (id) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${BASE_URL}/terms`,
      params: {
        id,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

export const postTerm = async (newTerm) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${BASE_URL}/terms`,
      data: newTerm,
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

export const putTerm = async (updatedSession) => {
  try {
    const res = await axios({
      method: "PUT",
      url: `${BASE_URL}/terms`,
      data: updatedSession,
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

export const deleteTerm = async (id) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `${BASE_URL}/terms/${id}`,
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};
