import { AppContextState, AppReducerAction } from "./types";

const AppContextReducer: React.Reducer<AppContextState, AppReducerAction> = (
  prev,
  action
): AppContextState => {
  switch (action.type) {
    case "CLEAN_SESSION": {
      return { ...prev, sessionToken: "", loadingSession: false };
    }
    case "REGISTER_SESSION": {
      return { ...prev, sessionToken: action.token, loadingSession: false };
    }
    case "LOADING_SESSION_UPDATE": {
      return { ...prev, loadingSession: action.status };
    }
    default:
      return prev;
  }
};

export default AppContextReducer;
