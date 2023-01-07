const { Router } = require("express");
const messageControllers = require("./controllers/message");
const middlewares = require("./middlewares/validations");

const messagesRouter = Router();

messagesRouter.get(
  "/",
  middlewares.validateToken,
  messageControllers.validations.getMessagesInChat,
  messageControllers.getMessagesInChat
);

messagesRouter.post(
  "/",
  middlewares.validateToken,
  messageControllers.validations.createMessage,
  messageControllers.createMessage
);

module.exports = messagesRouter;
