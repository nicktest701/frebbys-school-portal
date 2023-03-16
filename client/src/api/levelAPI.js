import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_NET_LOCAL;

//Get all Students
export const getAllLevels = async (session, term) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${BASE_URL}/levels/session`,
      params: {
        session,
        term,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

export const getLevel = async (id) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${BASE_URL}/levels`,
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

export const postLevel = async (newLevel) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${BASE_URL}/levels`,
      data: newLevel,
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

export const generateNewCurrentLevelDetailsFromLevels = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${BASE_URL}/levels/generate`,
      data,
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

export const putLevel = async (updatedLevel) => {
  try {
    const res = await axios({
      method: "PUT",
      url: `${BASE_URL}/levels`,
      data: updatedLevel,
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

export const deleteLevel = async ({ id, sessionId, termId }) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `${BASE_URL}/levels`,
      params: {
        id,
        sessionId,
        termId,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

//////////-------------SUBJECTS----------//////////

export const getSubjectsForLevel = async (levelId) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${BASE_URL}/levels/subject`,
      params: {
        levelId,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

export const addSubjectsToLevel = async (data) => {
  try {
    const res = await axios({
      method: "PUT",
      url: `${BASE_URL}/levels/subject`,
      data,
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};
