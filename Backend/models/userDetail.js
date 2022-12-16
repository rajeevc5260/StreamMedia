const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dob:{
      type:String,
      required:true
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      // default: "user",
      enum: ["user", "admin", "superAdmin"],
    },
    
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("users", userSchema);
