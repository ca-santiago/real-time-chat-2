import React from "react";
import AppContextActions, {
  CleanSession,
  RegisterSession,
} from "./actions";
import AppContextReducer from "./reducer";
import { AppContextState } from "./types";

export interface IAppContext {
  actions: AppContextActions;
  state: AppContextState;
}

export const appInitialState: AppContextState = {
  sessionToken: "",
  loadingSession: true,
};

export const AppContext = React.createContext<IAppContext | undefined>(
  undefined
);

export const AppContextProvider = ({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = React.useReducer(
    AppContextReducer,
    appInitialState
  );

  const registerSession = (token: string) => {
    localStorage.setItem("session-token", token);
    dispatch(RegisterSession(token));
  };

  const cleanSession = () => {
    localStorage.removeItem("session-token");
    dispatch(CleanSession());
  };

  const actions: AppContextActions = {
    cleanSession,
    registerSession,
  };

  React.useEffect(() => {
    const token = window.localStorage.getItem("session-token");
    if (token) {
      registerSession(token);
    } else {
      cleanSession();
    }
  }, []);

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
};
