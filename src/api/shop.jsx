import axios from "axios";

const API = process.env.NEXT_PUBLIC_SERVER_URL;

export const shopApi = {
  getProduct: async () => {
    try {
      const res = await axios.get(`${API}/shop`);
      return res;
    } catch (error) {
      return error;
    }
  },
  searchProduct: async (data) => {
    try {
      const res = await axios.get(`${API}/shop${data}`);
      return res;
    } catch (error) {
      return error;
    }
  },
  getCategory: async (data) => {
    try {
      const res = await axios.get(`${API}/category?q=shop`);
      return res;
    } catch (error) {
      return error;
    }
  },

  getPartner: async (data) => {
    try {
      const res = await axios.get(`${API}/partner`);
      return res;
    } catch (error) {
      return error;
    }
  },
  updateView: async (id) => {
    try {
      const res = await axios.post(`${API}/shop/updateView`, { id });

      return res;
    } catch (error) {
      return error;
    }
  },

  cloudyProduct: async (data) => {
    try {
      const res = await axios.post(`${API}/shop/${data.idLyrics}/cloudy`, data);
      return res;
    } catch (error) {
      return error;
    }
  },
};
