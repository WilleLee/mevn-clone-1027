import multer from "multer";

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

export const imageUploader = multer({
  limits: 500000,
  storage: imageStorage,
});
