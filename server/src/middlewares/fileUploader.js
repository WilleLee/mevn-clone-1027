import * as dotenv from "dotenv";
dotenv.config();
import multer from "multer";
import { S3Client } from "@aws-sdk/client-s3";
import multerS3 from "multer-s3";

const s3Params = {
  id: process.env.S3_KEY_ID,
  secret: process.env.S3_SECRET,
  region: "ap-northeast-2",
};
const s3 = new S3Client({
  credentials: { accessKeyId: s3Params.id, secretAccessKey: s3Params.secret },
  region: s3Params.region,
});
const s3ImageUploader = multerS3({
  s3,
  bucket: "mevn-clone-1027",
  acl: "public-read",
});

export const imageUploader = multer({
  limits: 500000,
  storage: s3ImageUploader,
});
