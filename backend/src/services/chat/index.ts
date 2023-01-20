import { Chat, ChatService, Message } from "../../domain/types";
import { ChatModel, MessageModel } from "./data-access";

const createChat = async (members: string[]): Promise<Chat> => {
  return await ChatModel.create({ members });
};

const getChat = async (chatId: string): Promise<Chat | null> => {
  return ChatModel.findById(chatId);
};

const addMemberToChat = async (
  chatId: string,
  userId: string
): Promise<Chat | null> => {
  const chat = await ChatModel.findOneAndUpdate(
    { _id: chatId },
    { $push: { members: userId } }
  );
  return chat?.toObject() || null;
};

const removeMemberFromChat = async (
  chatId: string,
  userId: string
): Promise<Chat | null> => {
  const chat = await ChatModel.findOneAndUpdate(
    { _id: chatId },
    { $pull: { members: userId } }
  );
  return getChat(chatId);
};

const checkExistingChat = async (
  user1: string,
  user2: string
): Promise<Chat | null> => {
  const chat = await ChatModel.findOne({
    members: { $all: [user1, user2] },
  });
  return chat;
};

const sendMessage = async (
  chatId: string,
  userId: string,
  content: string,
  timestamp: string = Date.now().toString()
): Promise<Message> => {
  return MessageModel.create({ content, userId, chatId, timestamp });
};

const getMessages = async (
  chatId: string,
  offset: number,
  count: number
): Promise<Message[]> => {
  return MessageModel.find({ chatId })
    .skip(offset)
    .limit(count)
    .sort({ timestamp: -1 });
};

const getChatsByUserId = async (
  userId: string,
  offset: number,
  count: number
): Promise<Chat[]> => {
  return ChatModel.find({ members: userId })//.skip(offset).limit(count);
};

const chatService: ChatService = {
  addMemberToChat,
  checkExistingChat,
  getChat,
  getMessages,
  removeMemberFromChat,
  sendMessage,
  createChat,
  getChatsByUserId,
};

export default chatService;
