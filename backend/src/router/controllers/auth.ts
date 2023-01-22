import { UserUseCases } from "../../domain/user";

import { check } from "express-validator";
import { validateBody } from "../middlewares/validations";
import { AppController } from "../types";
import { getUserId } from "./helpers";

const login: AppController = async (req, res) => {
  try {
    console.log("Im in login");
    const { email, password } = req.body;
    const loginData = await UserUseCases.loginUser({ email, password });
    return res.status(200).json(loginData);
  } catch (err: any) {
    res.status(500).send(err.message).end();
  }
};

const register: AppController = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const { token, user } = await UserUseCases.registerUser({
      email,
      name,
      password,
    });
    return res.status(200).json({ token, user });
  } catch (err: any) {
    return res.status(500).send(err.message).end();
  }
};

const renewToken: AppController = async (req, res) => {
  try {
    const token = req.header("x-session-token");
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const newToken = await UserUseCases.renewSession(token);
    res.status(202).json({ token: newToken });
  } catch (err: any) {
    res.status(500).send(err.message).end();
  }
};

const getUserById: AppController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await UserUseCases.getUserById(id);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(500).send(err.message).end();
  }
};

const getUserData: AppController = async (req, res) => {
  try {
    const userId = getUserId(req);
    const result = await UserUseCases.getUserById(userId);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(500).send(err.message).end();
  }
};

const authControllers = {
  login: [
    check("email").isEmail(),
    check("password")
      .not()
      .isEmpty()
      .isStrongPassword({ minLength: 4, minSymbols: 0, minUppercase: 0 }),
    validateBody,
    login,
  ],
  register: [
    check("email").isEmail(),
    check("name").isString(),
    check("password")
      .not()
      .isEmpty()
      .isStrongPassword({ minLength: 4, minSymbols: 0, minUppercase: 0 }),
    validateBody,
    register,
  ],
  renewToken,
  getUserData,
  getUserById
};

export default authControllers;
