export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Chat = {
  id: string;
  name: string;
  description: string;
};

export type ChatMember = {
  id: string;
  userId: string;
  chatId: string;
};

export type Message = {
  id: string;
  content: string;
  userId: string;
  chatId: string;
  timestamp: Date;
};

export type ChatService = {
  createChat(
    name: string,
    description: string,
    members: string[]
  ): Promise<Chat>;
  getChat(chatId: string): Promise<Chat | null>;
  addMemberToChat(chatId: string, userId: string): Promise<Chat | null>;
  removeMemberFromChat(chatId: string, userId: string): Promise<Chat | null>;
  checkExistingChat(user1: string, user2: string): Promise<Chat | null>;
  sendMessage(
    chatId: string,
    userId: string,
    content: string
  ): Promise<Message>;
  getMessages(chatId: string): Promise<Message[]>;
};
