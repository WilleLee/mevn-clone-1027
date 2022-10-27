import express from "express";
import API from "../controllers/apiControllers";
import { imageUploader } from "../middlewares/fileUploader";

const apiRoute = express.Router();

apiRoute.get("/", API.fetchAllPosts);
apiRoute.post("/create", imageUploader.single("image"), API.createPost);
apiRoute
  .route("/:id")
  .get(API.fetchPostByID)
  .put(imageUploader.single("image"), API.updatePost)
  .delete(API.deletePost);

export default apiRoute;
