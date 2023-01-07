const MessageModel = require("../../../services/mongoose/models/message");
const { getMessageDTO } = require("./helper");

const messageLimitToLoad = 30;

const getAllMessagesInChat = async (sender, receiver, offset = 0) => {
  const startFrom = Math.max(offset - 1, 0);
  const lastMessages = await MessageModel.find({
    $or: [
      { fromUser: sender, toUser: receiver },
      { fromUser: receiver, toUser: sender },
    ],
  })
    .sort({ createdAt: "desc" })
    .limit(messageLimitToLoad)
    .skip(startFrom * messageLimitToLoad)
    .lean();

  return {
    data: lastMessages.map(getMessageDTO),
    amount: messageLimitToLoad,
    offset: startFrom + 1,
  };
};

module.exports = getAllMessagesInChat;
