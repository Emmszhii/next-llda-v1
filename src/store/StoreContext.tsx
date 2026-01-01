"use client";
import React from "react";
import { StoreReducer, initialState } from "./StoreReducer";
import { StoreState, StoreAction } from "./StoreType";

interface StoreContextType {
  store: StoreState;
  dispatch: React.Dispatch<StoreAction>;
}

const StoreContext = React.createContext<StoreContextType | undefined>(
  undefined
);

const StoreProvider = (props: any) => {
  const [store, dispatch] = React.useReducer(StoreReducer, initialState);

  return (
    <StoreContext.Provider value={{ ...store, store, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  );
};

const useStore = (): StoreContextType => {
  const context = React.useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};

export { useStore, StoreContext, StoreProvider };
