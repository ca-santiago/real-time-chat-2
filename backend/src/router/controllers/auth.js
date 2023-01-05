const { check } = require("express-validator");
const validateBody = require("../middlewares/validations");

const login = async (req, res) => {
  res.send("Login...").end();
};

const register = async (req, res) => {
  res.end("Register...");
};

const renewToken = async (req, res) => {};

const validations = {
  login: [
    check("email").isEmail(),
    check("password")
      .not()
      .isEmpty()
      .isStrongPassword({ minLength: 4, minSymbols: 0, minUppercase: 0 }),
    validateBody,
  ],
};

const authControllers = {
  login,
  register,
  renewToken,
  validations,
};

module.exports = authControllers;
