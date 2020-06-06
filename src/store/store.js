import React from "react";
import firebase from "firebase/app";
import { firebaseConfig } from "../firebase/config";

const firebaseApp = firebase.initializeApp(firebaseConfig);

const ActionType = {
  SET_FIREBASE_APP: "SET_FIREBASE_APP",
};

const intialState = {
  firebaseApp: firebaseApp,
};
const StoreContext = React.createContext(intialState);

const StateProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case ActionType.SET_FIREBASE_APP:
        return { ...state, firebaseApp: action.payload };
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
