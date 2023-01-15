import { Chat, ChatService, Message } from "../../domain/types";
import { ChatMemberModel, ChatModel, MessageModel } from "./data-access";

const createChat = async (
  name: string,
  description: string,
  members: string[]
): Promise<Chat> => {
  const chat = await ChatModel.create({ name, description });
  await ChatMemberModel.create(
    members.map((userId) => ({ userId, chatId: chat._id }))
  );
  return chat;
};

const getChat = async (chatId: string): Promise<Chat | null> => {
  return ChatModel.findById(chatId);
};

const addMemberToChat = async (
  chatId: string,
  userId: string
): Promise<Chat | null> => {
  await ChatMemberModel.create({ userId, chatId });
  return getChat(chatId);
};

const removeMemberFromChat = async (
  chatId: string,
  userId: string
): Promise<Chat | null> => {
  await ChatMemberModel.deleteOne({ userId, chatId });
  return getChat(chatId);
};

const checkExistingChat = async (
  user1: string,
  user2: string
): Promise<Chat | null> => {
  const chatMembers = await ChatMemberModel.aggregate([
    { $match: { userId: { $in: [user1, user2] } } },
    {
      $group: {
        _id: "$chatId",
        count: { $sum: 1 },
      },
    },
    {
      $match: { count: 2 },
    },
  ]);
  if (chatMembers.length < 2) return null;
  console.log({ chatMembers });
  return ChatModel.findById(chatMembers[0].chatId);
};

const sendMessage = async (
  chatId: string,
  userId: string,
  content: string
): Promise<Message> => {
  return MessageModel.create({ content, userId, chatId });
};

const getMessages = async (chatId: string): Promise<Message[]> => {
  return MessageModel.find({ chatId });
};

const chatService: ChatService = {
  addMemberToChat,
  checkExistingChat,
  getChat,
  getMessages,
  removeMemberFromChat,
  sendMessage,
  createChat,
};

export default chatService;
