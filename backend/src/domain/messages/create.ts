import chatService from "../../services/chat";

interface CreateMessageProps {
  content: string;
  userId: string;
  chatId: string;
}

const createMessage = async (props: CreateMessageProps) => {
  const { content, chatId, userId } = props;
  return await chatService.sendMessage(chatId, userId, content);
};

export default createMessage;
