import { Router } from "express";
import authControllers from "./controllers/auth";
import { getUserId } from "./controllers/helpers";
import { validateToken } from "./middlewares/validations";

const authRouter = Router();

authRouter.post("/login", authControllers.login);
authRouter.post("/register", authControllers.register);
authRouter.post("/renew", authControllers.renewToken);

authRouter.get("/secured", validateToken, (req, res) => {
  const userId = getUserId(req);
  res.json({ userId });
});

export default authRouter;
