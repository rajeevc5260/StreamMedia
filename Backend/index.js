const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const passport = require("passport");
const { success, error } = require("consola");
const { connect } = require("mongoose");
const videoUploadModel = require("./models/videoUpload.Model");
const path = require('path')

// Brings the APP constants
const { DB, PORT } = require("./config");

// initialzing the APP
const app = new express();

app.use(express.static('uploads'))
// middlewares
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(passport.initialize());

require("./middlewares/passport")(passport);

// Router middleware
app.use("/api/users", require("./routes/users"));

// Video uploading method
// Storage to save video contents (multer)
const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + " - " + path.extname (file.originalname));
  }, 
});
const upload = multer({
  storage: Storage,
}).single("video");

// var multiple =  upload.fields([{name:'video', maxCount:3}, {name:'thumbnail', maxCount:3}, {name:'subtitle', maxCount:3}])

// var multiple = upload.array("video []")



// video upload post method req,res
app.post("/videoUpload",upload,(req,res,next)=>{
  const file = req.file
  console.log("file is",file.filename);
  if(!file){
    const error = new Error("please upload a file");
    console.log("file is",file);
    error.htppStatusCode = 400;
    return next(error)  
  }
  else {
    const newVideo = new videoUploadModel({
      title: req.body.title,
      // thumbnail: {
      //   data: req.file.filename,
      //   contentType: "image/png"
      // },
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
    res.json(file);
    newVideo
      .save()
      .then(() => console.log("Sucessfully uploaded") )
      .catch((err) => console.log(`The error occured in backend is`,err));
  }
});



// Database connection and Server running
const startApp = async () => {
  try {
    //  Connecting the Database
    await connect(DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    success({
      message: `Successfully connected with the Database \n${DB}`,
      badge: true,
    });
    // Listening to the server
    app.listen(PORT, () =>
      success({
        message: `Server is running successfully on ${PORT}`,
        badge: true,
      })
    );
  } catch (err) {
    error({
      message: `Database is not connected \n${err}`,
      badge: true,
    });
    startApp();
  }
};

startApp();