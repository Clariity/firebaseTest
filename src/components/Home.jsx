import React, { useContext, useEffect, useState } from "react";
import { StoreContext, ActionType } from "../store/store";
import { useHistory } from "react-router-dom";

function Home() {
  const { state, dispatch } = useContext(StoreContext);
  const [pinnedRecipes, setPinnedRecipes] = useState(null);
  let history = useHistory();

  //may be able to reuse this component for search but just filter here below like done with add
  useEffect(() => {
    if (state.user === null) history.push("/");
    else {
      dispatch({ type: ActionType.SET_TITLE, payload: "Nom Network" });
      if (state.userData.recipes) {
        const filtered = state.userData.recipes.filter((recipe, index) => {
          return recipe.pinned === true;
        });
        setPinnedRecipes(filtered);
      }
    }
  }, [history, dispatch, state.user, state.userData]);

  // const handleSignOut = () => {
  //   state.firebaseApp.auth().signOut();
  // };

  //need to check for if image no longer exists but still tries to get from downloadURL, need to reset downloadURL to be ""
  //will need to lazy load pictures as they scroll into view, loading 500 pictures will take some time

  return (
    <div className="recipe-list">
      {pinnedRecipes !== null &&
        pinnedRecipes.map((recipe, index) => {
          return (
            <div
              className="list-item"
              key={recipe.name + " " + recipe.lastUpdated}
              onClick={() =>
                history.push(
                  "/recipe?r=" + recipe.name.replace(/\s/g, "").toLowerCase()
                )
              }
            >
              <img
                className="list-item-image"
                src={
                  recipe.imageURL === null
                    ? "./images/logo.png"
                    : recipe.imageURL
                }
                alt={recipe.name}
              />
              <div className="list-item-details">
                <div className="recipe-name">{recipe.name}</div>
                <div>
                  {recipe.servings +
                    (recipe.servings === 1 ? " Serving" : " Servings")}
                </div>
                <div className="list-item-tags">
                  {recipe.tags.map((tag, index) => {
                    return (
                      <div
                        className="recipe-tag"
                        key={tag + "_" + index}
                        onClick={(event) => {
                          history.push(
                            "/search?t=" + tag.replace(/\s/g, "").toLowerCase()
                          );
                          event.stopPropagation();
                        }}
                      >
                        {tag}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="list-item-pin-container">
                <div
                  className="material-icons list-item-pin-button"
                  onClick={() => {}}
                >
                  push_pin
                </div>
              </div>
            </div>
          );
        })}
      {/* {state.userData !== null &&
        state.userData.recipes.map((recipe, index) => {
          return (
            <div>
              {recipe.name}
              <img
                src={recipe.imageURL === "" ? "" : recipe.imageURL}
                alt="testtt"
                width="200"
              />
            </div>
          );
        })} */}
    </div>
  );
}

export default Home;
