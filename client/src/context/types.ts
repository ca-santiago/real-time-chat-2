export interface AppContextState {
  sessionToken: string;
  loadingSession: boolean;
}

export interface RegisterSessionAction {
  type: "REGISTER_SESSION";
  token: string;
}

export interface CleanSessionAction {
  type: "CLEAN_SESSION";
}

export interface LoadingSessionUpdate {
  type: "LOADING_SESSION_UPDATE";
  status: boolean;
}

export type AppReducerAction =
  | RegisterSessionAction
  | CleanSessionAction
  | LoadingSessionUpdate;
