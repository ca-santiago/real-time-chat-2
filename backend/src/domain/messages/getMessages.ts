import chatService from "../../services/chat";

interface GetMessagesInChatProps {
  chatId: string;
  page: number;
  count: number;
}

const getMessagesInChat = async ({
  chatId,
  page,
  count,
}: GetMessagesInChatProps) => {
  const _page = page > 1 ? page : 1;
  const _count = count > 10 ? count : 10;
  const skip = (_page - 1) * _count;
  const chat = await chatService.getMessages(chatId, skip, count);
  return {
    messages: chat,
    totalCount: chat.length,
    page: _page,
    count: _count,
  };
};

export default getMessagesInChat;
