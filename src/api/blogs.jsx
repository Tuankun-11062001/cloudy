import axios from "axios";

const API = process.env.NEXT_PUBLIC_SERVER_URL;

export const blogsApi = {
  getBlogs: async () => {
    try {
      const res = await axios.get(`${API}/blogs`);
      return res;
    } catch (error) {
      return error;
    }
  },
  searchBlogs: async (data) => {
    try {
      const res = await axios.get(`${API}/blogs?title=${data}`);
      return res;
    } catch (error) {
      return error;
    }
  },

  cloudyBlogs: async (data) => {
    try {
      const res = await axios.post(`${API}/blogs/${data.id}/cloudy`, data);
      return res;
    } catch (error) {
      return error;
    }
  },

  updateView: async (id) => {
    try {
      const res = await axios.post(`${API}/blogs/updateView`, { id });

      return res;
    } catch (error) {
      return error;
    }
  },

  addComment: async (data) => {
    try {
      const res = await axios.post(`${API}/blogs/${data.id}/comment`, data);
      return res;
    } catch (error) {
      return error;
    }
  },

  deleteComment: async (data) => {
    try {
      const res = await axios.delete(
        `${API}/blogs/${data.id}/comment/${data.idComment}`
      );
      return res;
    } catch (error) {
      return error;
    }
  },
};
