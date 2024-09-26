const jwt = require("jsonwebtoken");
const tables = require("../../database/tables");
require("dotenv").config();

const checkAuth = (req, res, next) => {
  try {
    const { auth } = req.cookies;

    if (!auth) {
      res.sendStatus(401);
    } else {
      const decode = jwt.verify(auth, process.env.APP_SECRET);
      if (!decode) res.sendStatus(401);
      else res.sendStatus(200);
    }
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    res.cookie("auth", req.token).json({
      message: "Connexion réussie",
      id: req.user.id,
      email: req.user.email,
    });
  } catch (err) {
    next(err);
  }
};

const register = async (req, res, next) => {
  try {
    const {
      username,
      fullname,
      hashedPassword,
      email,
      civility,
      role = 0,
    } = req.body;
    await tables.user.create({
      username,
      fullname,
      password: hashedPassword,
      email,
      civility,
      role,
    });

    res.status(200).json({ message: "Inscription réussie" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkAuth,
  login,
  register,
};
