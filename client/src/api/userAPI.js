import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_NET_LOCAL;

//Get all Users
export const getAllUsers = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `${BASE_URL}/users`,
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const getUser = async (id) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${BASE_URL}/users/${id}`,
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const postUser = async (user) => {
  const formData = new FormData();
  //User
  formData.append("profile", user.profile);
  formData.append("fullname", user.fullname);
  formData.append("username", user.username);
  formData.append("dateofbirth", user.dateofbirth);
  formData.append("gender", user.gender);
  formData.append("role", user.role);
  formData.append("email", user.email);
  formData.append("phonenumber", user.phonenumber);
  formData.append("address", user.address);
  formData.append("residence", user.residence);
  formData.append("nationality", user.nationality);
  formData.append("password", user.password);

  try {
    const res = await axios({
      method: "POST",
      url: `${BASE_URL}/users`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const updateUserProfileImage = async ({ _id, profile }) => {
  const formData = new FormData();
  //User
  formData.append("profile", profile);
  formData.append("_id", _id);

  try {
    const res = await axios({
      method: "PUT",
      url: `${BASE_URL}/users/profile`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
    throw new Error(error.response.data || "Error Updating profile");
  }
};

export const putUser = async (updatedUser) => {
  try {
    const res = await axios({
      method: "PUT",
      url: `${BASE_URL}/users`,
      data: updatedUser,
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `${BASE_URL}/users/${id}`,
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};
