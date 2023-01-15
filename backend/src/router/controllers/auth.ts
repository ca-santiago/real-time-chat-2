import { Request, Response } from "express";
import { UserUseCases } from "../../domain/user";

import { check } from "express-validator";
import { validateBody } from "../middlewares/validations";

type AppController = (req: Request, res: Response) => any;

const login: AppController = async (req, res) => {
  try {
    console.log("Im in login");
    const { email, password } = req.body;
    const loginData = await UserUseCases.loginUser({ email, password });
    return res.status(200).json(loginData);
  } catch (err: any) {
    console.log(err);
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
};

export default authControllers;
