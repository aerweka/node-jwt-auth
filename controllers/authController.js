const auth = require("../services/authServices");

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
  await auth.signin(req, res);
};

const logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

module.exports = { signup_get, login_get, signup_post, login_post, logout_get };
