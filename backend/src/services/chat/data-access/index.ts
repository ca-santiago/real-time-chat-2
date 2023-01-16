import { model, Schema } from "mongoose";
import { User, Chat, Message } from "../../../domain/types";

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const UserModel = model<User>("User", UserSchema);

const ChatSchema = new Schema({
  name: { type: String, required: false, default: "" },
  members: { type: [String], required: true },
});

const ChatModel = model<Chat>("Chat", ChatSchema);

const MessageSchema = new Schema({
  content: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  chatId: { type: Schema.Types.ObjectId, ref: "Chat", required: true },
  timestamp: { type: Date, default: Date.now },
});

const MessageModel = model<Message>("Message", MessageSchema);

export { UserModel, ChatModel, MessageModel };
