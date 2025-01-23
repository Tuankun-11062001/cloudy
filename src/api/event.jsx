import axios from "axios";

const API = process.env.NEXT_PUBLIC_SERVER_URL;
// const API = "http://localhost:3003";

export const snakeAPI = {
  createPlayer: async (data) => {
    try {
      const res = await axios.post(`${API}/snake/create`, data);
      return res;
    } catch (error) {
      return error;
    }
  },
  findPlayer: async (data) => {
    try {
      const res = await axios.post(`${API}/snake/find`, data);
      return res;
    } catch (error) {
      return error;
    }
  },
};
