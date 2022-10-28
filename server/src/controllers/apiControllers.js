import Post from "../models/Post";
import fs from "fs";

class API {
  /**
   * express controller fetching all the posts that already exist
   * @param {object} req request object of express
   * @param {object} res response object of express
   * @returns
   */
  static async fetchAllPosts(req, res) {
    try {
      const posts = await Post.find();
      return res.status(200).json(posts);
    } catch (err) {
      return res.status(404).json({ message: err.message });
    }
  }
  /**
   * express controller fetching a post by ID
   * @param {object} req
   * @param {object} res
   * @returns
   */
  static async fetchPostByID(req, res) {
    const { id } = req.params;
    try {
      const post = await Post.findById(id);
      return res.status(200).json(post);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }
  /**
   * express controller creating a new post
   * @param {object} req
   * @param {object} res
   * @returns
   */
  static async createPost(req, res) {
    const post = req.body;
    console.log(req.file);
    const { location } = req.file;
    post.image = location;
    try {
      await Post.create(post);
      return res.status(201).json({ message: "✅ SUCCESSFULLY CREATED" });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }
  /**
   * express controller updating a post
   * @param {object} req request object of express
   * @param {object} res response object of express
   * @returns
   */
  static async updatePost(req, res) {
    const { id } = req.params;
    const updatedPost = req.body;
    try {
      const post = await Post.findById(id);
      console.log(post);
      let image;
      if (req.file) {
        image = req.file.filename;
      } else {
        image = post.image;
      }
      updatedPost.image = image;
      await Post.findByIdAndUpdate(id, updatedPost);
      return res.status(200).json({ message: "✅ SUCCESSFULLY UPDATED" });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }
  /**
   * express controller deleting a post
   * @param {object} req
   * @param {object} res
   * @returns
   */
  static async deletePost(req, res) {
    const { id } = req.params;
    try {
      const result = await Post.findByIdAndDelete(id);
      console.log(result);
      if (result.image) {
        try {
          fs.unlinkSync("./uploads/images/" + result.image);
        } catch (err) {
          console.log(err.message);
        }
      }
      return res.status(200).json({ message: "✅ SUCCESSFULLY DELETED" });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }
}

export default API;
