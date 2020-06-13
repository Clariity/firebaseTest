import React, { useContext, useEffect } from "react";

import { StoreContext } from "../store/store";
import { useHistory } from "react-router-dom";

import firebase from "firebase/app";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "firebase/auth";

function Login() {
  const { state } = useContext(StoreContext);
  let history = useHistory();

  useEffect(() => {
    if (state.user) history.push("/home");
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
}

export default Login;
