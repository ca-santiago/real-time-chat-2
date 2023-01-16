import { Router } from "express";
import chatControllers from "./controllers/chat";
import { validateToken } from "./middlewares/validations";

const authRouter = Router();

authRouter.post("/discover", validateToken, chatControllers.discoverChat);

export default authRouter;
