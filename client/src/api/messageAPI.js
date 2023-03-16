import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_NET_LOCAL;

//Get all Students
export const getAllMessages = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `${BASE_URL}/messages`,
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const getMessage = async (id) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${BASE_URL}/messages`,
      params: {
        id,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const postMessage = async (newMessage) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${BASE_URL}/messages/${newMessage.rate}`,
      data: newMessage,
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const putMessage = async (updatedMessage) => {
  try {
    const res = await axios({
      method: "PUT",
      url: `${BASE_URL}/messages`,
      data: updatedMessage,
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const deleteMessage = async (id) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `${BASE_URL}/messages/${id}`,
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};
