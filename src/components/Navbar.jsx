import React, { useContext } from "react";
import { StoreContext } from "../store/store";
import { useLocation, useHistory } from "react-router-dom";

function Navbar() {
  const { state } = useContext(StoreContext);
  let location = useLocation();
  let history = useHistory();

  const handleSignOut = () => {
    state.firebaseApp.auth().signOut();
    // history.push("/");
  };

  return (
    <div className="navbar">
      <img
        className={
          "navbar-image " +
          (location.pathname === "/home" ? "navbar-selected" : "")
        }
        src="./images/logo.png"
        alt="logo"
        onClick={() => history.push("/home")}
      />
      <div
        className={
          "navbar-title " +
          (location.pathname === "/recipe" ? "navbar-selected" : "")
        }
      >
        {state.title}
      </div>
      {state.user !== null && (
        <>
          <div
            className={
              "material-icons add-recipe-button " +
              (location.pathname === "/add" ? "navbar-selected" : "")
            }
            data-tip="Add new recipe"
            onClick={() => history.push("/add")}
          >
            add
          </div>
          <div
            className={
              "material-icons search-button " +
              (location.pathname === "/search" ? "navbar-selected" : "")
            }
            data-tip="Search for recipe"
            onClick={() => history.push("/search")}
          >
            search
          </div>
          <div
            className={"material-icons search-button "}
            data-tip="Sign Out"
            onClick={handleSignOut}
          >
            exit_to_app
          </div>
        </>
      )}
    </div>
  );
}

export default Navbar;
