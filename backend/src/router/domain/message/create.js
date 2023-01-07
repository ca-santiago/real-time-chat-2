const MessageModel = require("../../../services/mongoose/models/message");
const { UserModel } = require("../../../services/mongoose/models");
const { getMessageDTO } = require("./helper");

const createMessageInChat = async ({ content, fromUser, toUser }) => {
  try {
    const receiverExist = await UserModel.findById("63b8a47b5daa005e1d069949");
    if (!receiverExist) {
      throw new Error("Receiver does not exist");
    }
    const message = new MessageModel({
      createdAt: Date.now(),
      content,
      fromUser,
      toUser: "63b8a47b5daa005e1d069949",
    });
    message.save();
    return getMessageDTO(message.toObject());
  } catch (err) {
    console.devlog(`[create-message] ${err.message}`);
    throw new Error("Receiver does not exist");
  }
};

module.exports = createMessageInChat;
