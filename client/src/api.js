import axios from "axios";

export default class API {
  static async getAllPosts() {
    const res = await axios.get("/api");
    return res.data;
  }

  static async getPostByID(id) {
    const res = await axios.get(`/api/${id}`);
    return res.data;
  }

  static async addPost(post) {
    const res = await axios.post("/api/create", post);
    return res.data;
  }

  static async updatePost(id, post) {
    const res = await axios.put(`/api/${id}`, post);
    return res.data;
  }

  static async deletePost(id) {
    const res = await axios.delete(`/api/${id}`);
    return res.data;
  }
}
