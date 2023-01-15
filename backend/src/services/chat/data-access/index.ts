import { model, Schema } from "mongoose";
import { User, Chat, Message, ChatMember } from "../../../domain/types";


const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const UserModel = model<User>("User", UserSchema);

const ChatSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const ChatModel = model<Chat>("Chat", ChatSchema);

const ChatMemberSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  chatId: { type: Schema.Types.ObjectId, ref: "Chat", required: true },
});

const ChatMemberModel = model<ChatMember>("ChatMember", ChatMemberSchema);

const MessageSchema = new Schema({
  content: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  chatId: { type: Schema.Types.ObjectId, ref: "Chat", required: true },
  timestamp: { type: Date, default: Date.now },
});

const MessageModel = model<Message>("Message", MessageSchema);

export { UserModel, ChatMemberModel, ChatModel, MessageModel };
