import registerUser from "./register";
import loginUser from "./login";
import renewSession from "./renewSession";
import getUserById from "./get";

export const UserUseCases = {
  registerUser,
  loginUser,
  renewSession,
  getUserById,
};
