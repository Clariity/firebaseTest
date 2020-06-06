import React, { useContext, useEffect } from "react";

import { StoreContext } from "../store/store";
import { withRouter } from "react-router-dom";

import firebase from "firebase/app";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "firebase/auth";

export default withRouter((props) => {
  const { state } = useContext(StoreContext);

  useEffect(() => {
    var unregisterAuthObserver = state.firebaseApp
      .auth()
      .onAuthStateChanged((user) => {
        if (user) props.history.push("/home");
      });
    return unregisterAuthObserver;
  });

  const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "/home",
    signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
    credentialHelper: "none",
  };

  return (
    <div>
      Login
      <StyledFirebaseAuth
        uiConfig={uiConfig}
        firebaseAuth={state.firebaseApp.auth()}
      />
    </div>
  );
});
