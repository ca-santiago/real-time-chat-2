import { AppReducerAction } from "./types";

export const CleanSession = (): AppReducerAction => {
  return {
    type: "CLEAN_SESSION",
  };
};

export const RegisterSession = (token: string): AppReducerAction => {
  return {
    type: "REGISTER_SESSION",
    token,
  };
};

export const LoadingSessionUpdate = (newStatus: boolean): AppReducerAction => {
  return {
    type: "LOADING_SESSION_UPDATE",
    status: newStatus,
  };
};

type AppContextActions = {
  cleanSession: Function;
  registerSession: Function;
};

export default AppContextActions;
