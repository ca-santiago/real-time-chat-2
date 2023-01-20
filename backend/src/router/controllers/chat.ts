import { check } from "express-validator";
import { ChatUseCases } from "../../domain/chat";
import { validateBody } from "../middlewares/validations";
import { AppController } from "../types";
import { getUserId } from "./helpers";

const discoverChat: AppController = async (req, res) => {
  try {
    const { receiverId } = req.body;
    const userId = getUserId(req);

    const chat = await ChatUseCases.discoverChat(userId, receiverId);
    res.status(200).json(chat);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

const getChatList: AppController = async (req, res) => {
  try {
    const userId = getUserId(req);
    const chat = await ChatUseCases.getUserChats(userId, 1, 10);
    res.status(200).json(chat);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

const chatControllers = {
  discoverChat: [check("receiverId").exists(), validateBody, discoverChat],
  getChatList,
};

export default chatControllers;
