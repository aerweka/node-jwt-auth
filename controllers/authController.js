const User = require("../models/User");
const jwt = require("jsonwebtoken");
const auth = require("../services/authServices");
require("dotenv").config();

// handle error
// const maxAge = 3 * 24 * 60 * 60;

const signup_get = (req, res) => {
  res.render("signup");
};

const login_get = (req, res) => {
  res.render("login");
};

const signup_post = async (req, res) => {
  await auth.signup(req, res);
};

const login_post = async (req, res) => {
  // return await auth.signin(req, res);
  console.log("here");
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(200).json({ user: user._id });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

const logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

module.exports = { signup_get, login_get, signup_post, login_post, logout_get };
