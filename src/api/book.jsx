import axios from "axios";

const API = process.env.NEXT_PUBLIC_SERVER_URL;

export const bookApi = {
  getBook: async () => {
    try {
      const res = await axios.get(`${API}/books`);
      return res;
    } catch (error) {
      return error;
    }
  },
  searchBook: async (data) => {
    try {
      const res = await axios.get(`${API}/books?title=${data}`);
      return res;
    } catch (error) {
      return error;
    }
  },
  findChapterByBook: async (idBook) => {
    try {
      const res = await axios.get(`${API}/chapters/book/${idBook}`);
      return res;
    } catch (error) {
      return error;
    }
  },
  findChapter: async (id) => {
    try {
      const res = await axios.get(`${API}/chapters/${id}`);
      return res;
    } catch (error) {
      return error;
    }
  },

  cloudyBook: async (data) => {
    try {
      const res = await axios.post(`${API}/books/${data.id}/cloudy`, data);
      return res;
    } catch (error) {
      return error;
    }
  },

  updateView: async (id) => {
    try {
      const res = await axios.post(`${API}/books/updateView`, { id });

      return res;
    } catch (error) {
      return error;
    }
  },

  addComment: async (data) => {
    try {
      const res = await axios.post(`${API}/books/${data.id}/comment`, data);
      return res;
    } catch (error) {
      return error;
    }
  },

  deleteComment: async (data) => {
    try {
      const res = await axios.delete(
        `${API}/books/${data.id}/comment/${data.idComment}`
      );
      return res;
    } catch (error) {
      return error;
    }
  },
};
