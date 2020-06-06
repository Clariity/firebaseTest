import React, { useContext, useEffect } from "react";
import { StoreContext } from "../store/store";
import { withRouter } from "react-router-dom";

export default withRouter((props) => {
  const { state } = useContext(StoreContext);

  useEffect(() => {
    var unregisterAuthObserver = state.firebaseApp
      .auth()
      .onAuthStateChanged((user) => {
        if (user === null) props.history.push("/");
      });
    return unregisterAuthObserver;
  });

  const handleSignOut = () => {
    state.firebaseApp.auth().signOut();
  };

  return (
    <div>
      Home
      <button onClick={handleSignOut}>Sign-out</button>
    </div>
  );
});
