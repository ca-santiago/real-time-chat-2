import { UserModel } from "../../services/chat/data-access";
import { mongooseClean } from "../helper";
import { User } from "../types";

const getUserById = async (userId: string) => {
  const user = await UserModel.findOne<User>({ _id: userId }).lean();
  
  if (!user) {
    throw new Error("[login-user] user not found");
  }

  const {password, ...rest} = user;

  return { user: mongooseClean(rest) };
};

export default getUserById;
