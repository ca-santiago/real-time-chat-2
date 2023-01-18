import { Router } from "express";
import chatControllers from "./controllers/chat";
import messageController from "./controllers/message";
import { validateToken } from "./middlewares/validations";

const chatRouter = Router();

chatRouter.post("/discover", validateToken, chatControllers.discoverChat);

chatRouter.get("/:id/messages", validateToken, messageController.getMessages);

chatRouter.post("/:id", validateToken, messageController.createMessage);

export default chatRouter;
