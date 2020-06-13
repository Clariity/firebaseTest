import React from "react";
import firebase from "../firebase/config";

const ActionType = {
  SET_FIREBASE_APP: "SET_FIREBASE_APP",
  SET_USER: "SET_USER",
  SET_TITLE: "SET_TITLE",
  SET_USER_DATA: "SET_USER_DATA",
};

const intialState = {
  firebaseApp: firebase,
  user: null,
  title: "Nom Network",
  userData: {},
};
const StoreContext = React.createContext(intialState);

const StateProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case ActionType.SET_FIREBASE_APP:
        return { ...state, firebaseApp: action.payload };
      case ActionType.SET_USER:
        return { ...state, user: action.payload };
      case ActionType.SET_TITLE:
        return { ...state, title: action.payload };
      case ActionType.SET_USER_DATA:
        return { ...state, userData: action.payload };
      default:
        throw new Error(`Unhandled ActionType ${action.type}`);
    }
  }, intialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StateProvider, ActionType };
