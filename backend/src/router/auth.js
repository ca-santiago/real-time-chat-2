const { Router } = require("express");
const authControllers = require("./controllers/auth");

const authRouter = Router();

authRouter.post(
  "/login",
  authControllers.validations.login,
  authControllers.login
);
authRouter.post(
  "/register",
  authControllers.validations.register,
  authControllers.register
);
authRouter.post("/renew", authControllers.renewToken);

module.exports = authRouter;
