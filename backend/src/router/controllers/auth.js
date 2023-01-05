const { check } = require("express-validator");
const bcrypt = require("bcryptjs");

const UserModel = require("../../services/mongoose/models/User");
const validateBody = require("../middlewares/validations");
const tokenService = require("../../services/token");

const getUserDTO = ({ email, name, _id }) => ({
  email,
  name,
  id: _id,
});

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(404).end();
  }

  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) {
    return res.status(404).end();
  }

  // Sign token
  const token = await tokenService.signToken(user._id);

  return res.json({ user: getUserDTO(user), token });
};

const register = async (req, res) => {
  const { email, password, name } = req.body;

  const existUser = await UserModel.findOne({ email });
  if (existUser) {
    return res.status(401).end();
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const user = new UserModel({ email, password: hash, name });
  await user.save();

  const token = await tokenService.signToken(user._id);

  return res.status(200).json({ user: getUserDTO(user), token });
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
