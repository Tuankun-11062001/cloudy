import { getLocalStorage } from "@/components/storage/local";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_SERVER_URL;

export const communicationApi = {
  getCommunications: async (data) => {
    try {
      const res = await axios.get(`${API}/communication${data}`);
      return res;
    } catch (error) {
      return error;
    }
  },
  createCommunication: async (data) => {
    try {
      // check login

      const idLocal = getLocalStorage("_CM_id");

      if (!idLocal) {
        return console.log("Not Login");
      }

      const res = await axios.post(`${API}/communication/create`, data);
      return res;
    } catch (error) {
      return error;
    }
  },
  cloudyCommunication: async (data) => {
    try {
      // check login
      const idLocal = getLocalStorage("_CM_id");

      if (!idLocal) {
        return console.log("Not Login");
      }
      const res = axios.post(`${API}/communication/${data._id}/cloudy`, data);
      return res;
    } catch (error) {
      return error;
    }
  },

  commentCommunication: async (data) => {
    try {
      // check login
      const idLocal = getLocalStorage("_CM_id");

      if (!idLocal) {
        return console.log("Not Login");
      }
      const res = axios.post(`${API}/communication/${data._id}/comment`, data);
      return res;
    } catch (error) {
      return error;
    }
  },

  commentReplyCommunication: async (data) => {
    try {
      // check login
      const idLocal = getLocalStorage("_CM_id");

      if (!idLocal) {
        return console.log("Not Login");
      }
      const res = axios.post(
        `${API}/communication/${data._id}/comment/${data.commentId}/replies`,
        data
      );
      return res;
    } catch (error) {
      return error;
    }
  },

  deleteCommunication: async (id) => {
    try {
      const res = axios.delete(`${API}/communication/delete/${id}`);
      return res;
    } catch (error) {
      return error;
    }
  },
};
