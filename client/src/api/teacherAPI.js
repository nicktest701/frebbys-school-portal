import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_NET_LOCAL;

//Get all Teachers
export const getAllTeachers = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `${BASE_URL}/teachers`,
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const getTeacher = async (id) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${BASE_URL}/teachers/${id}`,
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const postTeacher = async (teacher) => {
  const formData = new FormData();
  //Teacher
  formData.append("profile", teacher.profile);
  formData.append("firstname", teacher.firstname);
  formData.append("surname", teacher.surname);
  formData.append("othername", teacher.othername);
  formData.append("dateofbirth", teacher.dateofbirth);
  formData.append("gender", teacher.gender);
  formData.append("email", teacher.email);
  formData.append("phonenumber", teacher.phonenumber);
  formData.append("address", teacher.address);
  formData.append("residence", teacher.residence);
  formData.append("nationality", teacher.nationality);

  try {
    const res = await axios({
      method: "POST",
      url: `${BASE_URL}/teachers`,
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

export const updateTeacherProfileImage = async ({ _id, profile }) => {
  const formData = new FormData();
  //Teacher
  formData.append("profile", profile);
  formData.append("_id", _id);

  try {
    const res = await axios({
      method: "PUT",
      url: `${BASE_URL}/teachers/profile`,
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

export const putTeacher = async (updatedTeacher) => {
  try {
    const res = await axios({
      method: "PUT",
      url: `${BASE_URL}/teachers`,
      data: updatedTeacher,
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const deleteTeacher = async (id) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `${BASE_URL}/teachers/${id}`,
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};
