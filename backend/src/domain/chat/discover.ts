import chatService from "../../services/chat";

const discoverChat = async (userId1: string, userId2: string) => {
  try {
    const chat = await chatService.checkExistingChat(userId1, userId2);
    if (chat) {
      return { chat };
    }
    return await chatService.createChat([userId1, userId2]);
  } catch (error) {
    console.log("[discover-chat] error: ", error);
    throw error;
  }
};

export default discoverChat;
