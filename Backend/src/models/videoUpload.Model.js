const mongoose = require("mongoose");

const db =
  "mongodb+srv://rajeevc:rajeev321@cluster0.w68gpom.mongodb.net/StreamMedia";

mongoose.connect(db, (err) => {
  if (err) {
    console.error("Error" + err);
  } else {
    console.log("Database is connnected");
  }
});

// Schema for uploading video and its contents

const Schema = mongoose.Schema;
const videoUploadSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  video: {
    data: Buffer,
    contentType: String,
  },
  subtitle: {
    data: Buffer,
    contentType: String,
  },
  category: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

const videoUpload = mongoose.model("videosData", videoUploadSchema);
module.exports = videoUpload;
