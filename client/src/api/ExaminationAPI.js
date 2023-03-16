import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_NET_LOCAL;

//Get all Students
export const getAllExams = async (id) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${BASE_URL}/examinations`,
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        sessionId: id,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

//Get all level exams details
export const getExamsDetails = async (session) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${BASE_URL}/examinations/details`,
      params: session,
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

//Get all Students
export const getStudentAcademics = async (session, student, level) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${BASE_URL}/examinations/student/all`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        student,
        session: session.sessionId,
        term: session.termId,
        level,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

//Get Exams by exams id
export const getExams = async (examsId) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${BASE_URL}/examinations/student`,
      params: {
        examsId,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};
//Get Exams by exams id
export const getCurrentExams = async (session) => {

  try {
    const res = await axios({
      method: "POST",
      url: `${BASE_URL}/examinations/student/current`,
      data: session,
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

//Add new Exams
export const postExamsRemarks = async (comments) => {
  try {
    const res = await axios({
      method: "PUT",
      url: `${BASE_URL}/examinations/comments`,
      data: comments,
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};
//Add new Exams
export const postExams = async (newExam) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${BASE_URL}/examinations`,
      data: newExam,
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};
//Update Exams scores
export const updateExams = async (updatedScores) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${BASE_URL}/examinations/update`,
      data: updatedScores,
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

export const putExams = async (updatedExam) => {
  try {
    const res = await axios({
      method: "PUT",
      url: `${BASE_URL}/examinations`,
      data: updatedExam,
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

export const deleteExams = async (id) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `${BASE_URL}/examinations`,
      params: {
        _id: id,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};
