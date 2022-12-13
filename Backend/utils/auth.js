const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/userDetail");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");

// Register functions for the users
const userRegister = async (userDets, role, res) => {
  try {
    // validate the user
    let emailNotRegistered = await validateEmail(userDets.email);
    if (!emailNotRegistered) {
      return res.status(400).json({
        message: "Email ID is already Registered",
        success: false,
      });
    }

    //Get hashed password
    const password = await bcrypt.hash(userDets.password, 12);
    //create a new user
    const newUser = new User({
      ...userDets,
      password,
      role,
    });

    await newUser.save();
    return res.status(201).json({
      message: "successfully registred. Please login.",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Unable to create the account",
      success: false,
    });
  }
};

// login function for the users
const userLogin = async (userCreds, role, res) => {
  let { email, password } = userCreds;
  // First Check if the username is in the database
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "Email is not found. Invalid login credentials.",
      success: false,
    });
  }
  // We will check the role
  if (user.role !== role) {
    return res.status(403).json({
      message: "Please make sure you are logging in from the right portal.",
      success: false,
    });
  }
  // That means user is existing and trying to signin fro the right portal
  // Now check for the password

  let isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    // Sign in the token and issue it to the user
    let token = jwt.sign(
      {
        user_id: user._id,
        role: user.role,
        email: user.email,
      },
      SECRET,
      { expiresIn: "7 days" }
    );

    let result = {
      role: user.role,
      email: user.email,
      token: `Bearer ${token}`,
      expiresIn: 168,
    };

    return res.status(200).json({
      ...result,
      message: "Hurray! You are now logged in.",
      success: true,
    });
  } else {
    return res.status(403).json({
      message: "Incorrect password.",
      success: false,
    });
  }
};

// passport middleware
const userAuth = passport.authenticate("jwt", { session: false });

// Check Role Middleware
const checkRole = (roles) => (req, res, next) =>
  !roles.includes(req.user.role)
    ? res.status(401).json("Unauthorized")
    : next();



const validateEmail = async (email) => {
  let user = await User.findOne({ email });
  return user ? false : true;
};



const serializeUser = (user) => {
  return {
    email: user.email,
    name: user.name,
    _id: user._id,
    //   updatedAt: user.updatedAt,
    //   createdAt: user.createdAt
  };
};
module.exports = { userRegister, userLogin, userAuth, serializeUser, checkRole };
