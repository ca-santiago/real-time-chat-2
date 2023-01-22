import { Router } from "express";
import authControllers from "./controllers/auth";

const authRouter = Router();

authRouter.post("/login", authControllers.login);
authRouter.post("/register", authControllers.register);
authRouter.post("/renew", authControllers.renewToken);

export default authRouter;
