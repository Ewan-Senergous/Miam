const tables = require("../../database/tables");

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
    const { username, pseudo, hashedPassword, email, civility, role = 0 } = req.body;
    await tables.user.create({
      username,
      pseudo,
      password: hashedPassword,
      email,
      civility,
      role,
    });

    console.info(req.body.hashPassword);

    res.status(200).json({ message: "Inscription réussie" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  register,
};
