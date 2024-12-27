import axios from "axios";

const API = process.env.NEXT_PUBLIC_SERVER_URL;

export const adsApi = {
  getAds: async (data) => {
    try {
      const res = await axios.get(`${API}/ads${data}`);

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
};
