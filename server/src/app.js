// IMPORTS
import * as dotenv from "dotenv";
dotenv.config();
import regeneratorRuntime from "regenerator-runtime";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
// routes
import apiRoute from "./routes/apiRoute";

const app = express();
const $PORT = process.env.PORT || 3000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static("uploads"));
app.use(morgan("dev"));

// db
try {
  mongoose.connect(process.env.MONGO_URI);
  console.log("✅SUCCESSFULLY CONNECTED TO THE DATABASE");
} catch (err) {
  console.log(`❗️ERROR OCCURRED WHILE CONNECTING TO THE DATABSE : ${err}`);
}

app.use("/api", apiRoute);

// start server
app.listen($PORT, () => {
  console.log(`The application is listening to the port ${$PORT}`);
});
