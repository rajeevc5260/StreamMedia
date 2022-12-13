const mongoose = require("mongoose");

// Schema for uploading video and its contents

const Schema = mongoose.Schema;
const videoUploadSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  // thumbnail: {
  //   data: Buffer,
  //   contentType: String,
  // },
  desc: {
    type: String,
    required: true,
  },
  video: {
    data: Buffer,
    contentType: String,
  },
  // subtitle: {
  //   data: Buffer,
  //   contentType: String,
  // },
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
