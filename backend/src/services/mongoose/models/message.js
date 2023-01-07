const { Schema, model } = require("mongoose");

const messageSchema = Schema({
  fromUser: String,
  toUser: String,
  content: String,
  createdAt: String,
});

const MessageModel = model("Message", messageSchema);
module.exports = MessageModel;
