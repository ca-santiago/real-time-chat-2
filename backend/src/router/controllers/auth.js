const { check } = require("express-validator");
const UserModel = require("../../services/mongoose/models/User");
const validateBody = require("../middlewares/validations");

const login = async (req, res) => {
  res.send("Login...").end();
};

const register = async (req, res) => {
  const { email, password, name } = req.body;

  const existUser = await UserModel.findOne({ email });
  if (existUser) {
    return res.status(401).end();
  }

  const user = new UserModel({ email, password, name });
  await user.save();

  return res.status(200).json(user);
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
  register: [
    check("email").isEmail(),
    check("name").isString(),
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
