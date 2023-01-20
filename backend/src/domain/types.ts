export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Chat = {
  _id: string;
  name?: string;
  members: string[];
};

export type Message = {
  id: string;
  content: string;
  userId: string;
  chatId: string;
  timestamp: Date;
};

export type ChatService = {
  createChat(members: string[]): Promise<Chat>;
  getChat(chatId: string): Promise<Chat | null>;
  addMemberToChat(chatId: string, userId: string): Promise<Chat | null>;
  removeMemberFromChat(chatId: string, userId: string): Promise<Chat | null>;
  checkExistingChat(user1: string, user2: string): Promise<Chat | null>;
  sendMessage(
    chatId: string,
    userId: string,
    content: string,
    timestamp?: string
  ): Promise<Message>;
  getMessages(
    chatId: string,
    offset: number,
    count: number
  ): Promise<Message[]>;
  getChatsByUserId(
    userId: string,
    offset: number,
    count: number
  ): Promise<Chat[]>;
};
