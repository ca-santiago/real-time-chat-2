import { check } from "express-validator";
import messagesUseCases from "../../domain/messages";
import { validateBody } from "../middlewares/validations";
import { AppController } from "../types";
import { getUserId } from "./helpers";

const getMessages: AppController = async (req, res) => {
  try {
    const chatId = req.params.id as string;
    const messages = await messagesUseCases.getMessagesInChat({
      chatId,
      count: 20,
      page: 1,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getMessagesById: AppController = async (req, res) => {};

const createMessage: AppController = async (req, res) => {
  try {
    const chatId = req.params.id as string;
    const { content } = req.body;
    const userId = getUserId(req);

    const message = await messagesUseCases.createMessage({
      chatId,
      content,
      userId,
    });
    res.status(200).json({ message });
  } catch (err) {
    res.status(500).json(err);
  }
};

const messageController = {
  getMessages,
  createMessage: [check("content").isString(), validateBody, createMessage],
};

export default messageController;
