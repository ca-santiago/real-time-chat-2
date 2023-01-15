import bcrypt from "bcryptjs";

import { UserModel } from "../../services/chat/data-access";
import tokenService from "../../services/token";

interface LoginUserProps {
  email: string;
  password: string;
}

const loginUser = async ({ email, password }: LoginUserProps) => {
  const user = await UserModel.findOne({ email }).lean();

  if (!user) {
    throw new Error("[login-user] user not found");
  }

  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) {
    throw new Error("[login-user] credentials does not match");
  }

  // Sign token
  const token = tokenService.signToken({ userId: user._id });

  return { user, token };
};

export default loginUser;
