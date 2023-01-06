const { Router } = require("express");
const authControllers = require("./controllers/auth");
const { getUserId } = require("./controllers/helpers");
const middlewares = require("./middlewares/validations");

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

authRouter.get("/secured", middlewares.validateToken, (req, res) => {
  const userId = getUserId(req);
  res.json({ userId });
});

module.exports = authRouter;
