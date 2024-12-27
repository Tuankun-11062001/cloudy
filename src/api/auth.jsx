import axios from "axios";

const API = process.env.NEXT_PUBLIC_SERVER_URL;

export const register = async (data) => {
  try {
    const res = await axios.post(`${API}/auth/register`, data);
    return res;
  } catch (error) {
    return error;
  }
};

export const login = async (data) => {
  try {
    const res = await axios.post(`${API}/auth/login`, data);
    return res;
  } catch (error) {
    return error;
  }
};

export const getUserId = async (id) => {
  try {
    const res = await axios.get(`${API}/user/find/${id}`);
    return res;
  } catch (error) {
    return error;
  }
};
