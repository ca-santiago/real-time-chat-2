import React from "react";
import { AppContext, IAppContext } from "../context/provider";

const useAppContext = (): IAppContext => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext should be called inside AppContextProvider");
  }
  return context;
};

export default useAppContext;
