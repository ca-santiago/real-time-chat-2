import React from "react";
import useAppContext from "../hooks/useAppContext";

export const ChatsPage = () => {
  const { actions } = useAppContext();
  return (
    <div>
      <h3>Welcome in</h3>
      <button
        onClick={() => {
          actions.cleanSession();
        }}
      >
        Salir
      </button>
    </div>
  );
};
