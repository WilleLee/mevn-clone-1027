import express from "express";
import API from "../controllers/apiControllers";
import { imageUploader } from "../middlewares/fileUploader";

const apiRoute = express.Router();

apiRoute.get("/", API.fetchAllPosts);
apiRoute.post("/create", imageUploader.single("image"), API.createPost);
apiRoute.get("/:id", API.fetchPostByID);
apiRoute.post("/:id/update", imageUploader.single("image"), API.updatePost);
apiRoute.delete("/:id/delete", API.deletePost);

export default apiRoute;
