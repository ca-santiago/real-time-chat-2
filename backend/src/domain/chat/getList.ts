import chatService from "../../services/chat";

const getUserChats = async (userId: string, page: number, count: number) => {
  const _page = page > 1 ? page : 1;
  const _count = count > 10 ? count : 10;
  const skip = (_page - 1) * _count;

  // Get the chats
  const chats = await chatService.getChatsByUserId(userId, skip, _count);

  // const chatsById = chats.reduce<any>((acc, chat) => {
  //   acc[chat._id] = chat;
  //   return acc;
  // }, {});

  return { chats };
};

export default getUserChats;
