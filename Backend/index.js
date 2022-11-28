const express = require("express");
const cors = require("cors");
const multer = require("multer");

const videoUploadModel = require("./src/models/videoUpload.Model");

const app = new express();

app.use(cors());
app.use(express.json());

// Storage to save video contents (multer)
const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + " - " + file.originalname);
  },
});
const upload = multer({
  storage: Storage,
}).single("video");
// .fields([{name:'video', maxCount: 10}, {name:'subtitle', maxCount:10}])

// video upload post method req,res
app.post("/videoUpload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      const newVideo = new videoUploadModel({
        title: req.body.title,
        desc: req.body.desc,
        video: {
          data: req.file.filename,
          contentType: "video/mp4",
        },
        // subtitle:{
        //   data: req.file.filename,
        //   contentType: "text/vvt"
        // },
        category: req.body.category,
        author: req.body.author,
      });
      newVideo
        .save()
        .then(() => res.send("Sucessfully uploaded"))
        .catch((err) => console.log(err));
    }
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port 3000`);
});
