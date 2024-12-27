import axios from "axios";

const API = process.env.NEXT_PUBLIC_SERVER_URL;

export const supportApi = {
  addFeedback: async (data) => {
    try {
      const res = await axios.put(`${API}/support/${data._id}`, data);
      return res;
    } catch (error) {
      return error;
    }
  },
};
