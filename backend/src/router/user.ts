import { Router } from "express";
import authControllers from "./controllers/auth";
import { validateToken } from "./middlewares/validations";

const userRouter = Router();

userRouter.get("/", validateToken, authControllers.getUserData);
userRouter.get("/:id", validateToken, authControllers.getUserById);

export default userRouter;
