# MEVN-CLONE-1027 (My First Vue.js Project)

## Deployment

### heroku.app

Visit [here](https://mevn-clone-2027.herokuapp.com/) to browse the project made.

<a href="https://mevn-clone-2027.herokuapp.com/"><img src="https://github.com/WilleLee/files/blob/main/mevn-preview.png" /></a>

### Functions

You can add posts with an image freely, edit and delete them. Give it a try.

And if you're interested in our ROK kingdom of 1770, contact Orange of N70 or ADINAVO of N70D!

## Development

### Back-end

#### mongoDB using mongoose and Amazon S3 bucket

This application stores data for posts uploaded to mongoDB by using the mongoose module, and media files to the amazon S3 bucket.

mongoose helps you connect the application to the mongoDB cluster so easily. Firstly, _mongoose.connect()_ method receives mongoDB url as the argument and tries to make connection to the database. This needs to be handled inside a _try ... catch_ statement, since it might fail to connect for any reasons.

```javascript
// ./server/src/app.js
// ...

try {
  mongoose.connect(process.env.MONGO_URI);
  console.log("✅SUCCESSFULLY CONNECTED TO THE DATABASE");
} catch (err) {
  console.log(`❗️ERROR OCCURRED WHILE CONNECTING TO THE DATABSE : ${err}`);
}

// ...
```

While data that are simple characters are saved in mongoDB, media files can be stored to a new folder inside the project, but in this sense, all the data will be gone, since they don't persist on the internet and can not be shared. Thus I created a bucket on the Amazon S3 and tried to make the application to send those data to the bucket as soon as they are created. For this job, you need three different modules, multer, multer-s3, and @aws-sdk/client-s3.

```javascript
// ./server/src/middlewares/fileUploader.js

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
```

Like above, _S3Client_ constructor function of the _@aws-sdk/client-s3_ builds a bundle of the S3 client information for the _multer-s3_ module so that this can organize the information for the storage and _multer_, which is a file uploader, uses that. What you have to do is to send that as a middleware to appropriate controllers for routes that deal with files that are uploaded by clients like `apiRoute.post("/create", imageUploader.single("image"), API.createPost);`.

### Front-end

client build -> dist 폴더 옮기기 -> server/dist -> server 실행

1. client 폴더 이동
2. npm ci
3. npm run build
4. ./client/dist -> ./server/dist 이동

5. server 폴더 이동
6. npm ci
7. babel
8. node app.js

### Issues

버켓 네임이 반복되면서 uri가 생성 -> 버켓의 base url을 env로 설정하고 로케이션 손수 제작

deployment

https://mevn-clone-2027.herokuapp.com/
