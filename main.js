const express = require('express');
const app = express();
const vision = require('@google-cloud/vision');
const multer = require("multer");
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const { google } = require('@google-cloud/vision/build/protos/protos');

app.use(cors());

const handleError = (err, res) => {
  res
    .status(500)
    .contentType("multipart/form-data")
    .end("Oops! Something went wrong!");
};


const upload = multer({
  dest: "./uploaded"
});

const client = new vision.ImageAnnotatorClient({
  keyFilename: './APIKey.json'
});


app.post("/upload", upload.single("uploadButton"),
  (req, res) => {
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, `./uploaded/${req.file.originalname}`);
      fs.rename(tempPath, targetPath, (err) => {
        if (err) return handleError(err, res);
        return googleFunc(res)
      });
      const googleFunc = async (res) => {
        const result = await client.documentTextDetection(`./uploaded/${req.file.originalname}`);
        const data = result[0].fullTextAnnotation.text
        res
          .status(200)
          .contentType("application/json")
          .end(data)
        return false
      }
  }
);


app.get("/", express.static(path.join(__dirname, "./public/")));


app.listen(5000, '127.0.0.1', () => console.log('Server running'));

