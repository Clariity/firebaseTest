import React, { useContext, useEffect } from "react";
import Navbar from "./components/Navbar";
import ReactTooltip from "react-tooltip";
import Routes from "./routing/Routes";
import { StoreContext, ActionType } from "./store/store";
import { BrowserRouter as Router } from "react-router-dom";

import "./styles/App.css";
import "./styles/Add.css";
import "./styles/Home.css";
import "./styles/Navbar.css";
import "./styles/Search.css";
import "./styles/Login.css";
import "./styles/Responsive.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-typeahead/css/Typeahead.css";

function App() {
  const { state, dispatch } = useContext(StoreContext);

  useEffect(() => {
    var unregisterAuthObserver = state.firebaseApp
      .auth()
      .onAuthStateChanged((user) => {
        dispatch({ type: ActionType.SET_AUTH_LOADED, payload: true });
        dispatch({ type: ActionType.SET_USER, payload: user });
      });
    return unregisterAuthObserver;
  }, [dispatch, state.firebaseApp]);

  useEffect(() => {
    if (state.user !== null) {
      var unregisterChangeObserver = state.firebaseApp
        .firestore()
        .collection("users")
        .doc(state.user.uid)
        .onSnapshot(function (doc) {
          console.log("Current data: ", doc.data());
          dispatch({ type: ActionType.SET_USER_DATA, payload: doc.data() });
        });
      return unregisterChangeObserver;
    }
  }, [dispatch, state.firebaseApp, state.user]);

  return (
    state.authLoaded && (
      <div className="App">
        <ReactTooltip delayShow={500} />
        <Router>
          <Navbar />
          <Routes />
        </Router>
      </div>
    )
  );
}

export default App;
