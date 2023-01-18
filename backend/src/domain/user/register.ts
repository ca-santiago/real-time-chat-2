import bcrypt from 'bcryptjs';

import { UserModel } from "../../services/chat/data-access";
import tokenService from '../../services/token';

interface RegisterUserProps {
  email: string;
  password: string;
  name: string;
}

const registerUser = async (props: RegisterUserProps) => {
  const { email, password, name } = props;

  const existUser = await UserModel.findOne({ email });
  if (existUser) {
    throw new Error('[register-user] duplicated email');
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const user = new UserModel({ email, password: hash, name });
  await user.save();

  const token = tokenService.signToken({userId: user._id});

  return { user: user.toObject(), token };
};

export default registerUser;
