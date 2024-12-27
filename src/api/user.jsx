import axios from "axios";

const API = process.env.NEXT_PUBLIC_SERVER_URL;

export const userApi = {
  getAllUser: async (data) => {
    try {
      const res = await axios.get(`${API}/user${data}`);
      return res;
    } catch (error) {
      return error;
    }
  },

  getEvent: async () => {
    try {
      const res = await axios.get(`${API}/event`);
      return res;
    } catch (error) {
      return error;
    }
  },

  newLatestUser: async () => {
    try {
      const res = await axios.get(`${API}/user/newlatest`);
      return res;
    } catch (error) {
      return error;
    }
  },
  findUser: async (id) => {
    try {
      const res = await axios.get(`${API}/user/find/${id}`);
      return res;
    } catch (error) {
      return error;
    }
  },
  changePassword: async (data) => {
    try {
      const res = await axios.put(
        `${API}/user/changePassword/${data.idChanger}`,
        data
      );
      return res;
    } catch (error) {
      return error;
    }
  },

  editUser: async (data) => {
    try {
      const res = await axios.put(`${API}/user/${data._id}`, data);
      return res;
    } catch (error) {
      return error;
    }
  },
};
