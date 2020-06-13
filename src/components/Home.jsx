import React, { useContext, useEffect, useState } from "react";
import RecipeLink from "./RecipeLink";
import { StoreContext, ActionType } from "../store/store";
import { useHistory } from "react-router-dom";

function Home() {
  const { state, dispatch } = useContext(StoreContext);
  const [pinnedRecipes, setPinnedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  let history = useHistory();

  useEffect(() => {
    if (state.user === null) history.push("/");
    else {
      dispatch({ type: ActionType.SET_TITLE, payload: "Home" });
      if (state.userData.recipes) {
        const filtered = state.userData.recipes.filter((recipe, index) => {
          return recipe.pinned === true;
        });
        setPinnedRecipes(filtered);
        setLoading(false);
      }
    }
  }, [history, dispatch, state.user, state.userData]);

  //need to check for if image no longer exists but still tries to get from downloadURL, need to reset downloadURL to be ""
  //will need to lazy load pictures as they scroll into view, loading 500 pictures will take some time

  return (
    <div className="recipe-list">
      {!loading ? (
        <>
          <h1>Pinned Recipes</h1>
          {pinnedRecipes.length !== 0 ? (
            state.userData.recipes.map((recipe, index) => {
              return (
                recipe.pinned && (
                  <RecipeLink
                    recipe={recipe}
                    index={index}
                    key={recipe.name + " " + recipe.lastUpdated + "-pinned"}
                  />
                )
              );
            })
          ) : (
            <div>No Pinned Recipes</div>
          )}
          <br />
          <h1>All Recipes</h1>
          {state.userData.recipes !== undefined &&
          state.userData.recipes.length !== 0 ? (
            state.userData.recipes.map((recipe, index) => {
              return (
                <RecipeLink
                  recipe={recipe}
                  index={index}
                  key={recipe.name + " " + recipe.lastUpdated}
                />
              );
            })
          ) : (
            <>
              <div>No Recipes</div>
              <button
                className="back-to-search"
                onClick={() => history.push("/add")}
              >
                Add a recipe
              </button>
            </>
          )}
        </>
      ) : (
        <div>Loading Recipes</div>
      )}
    </div>
  );
}

export default Home;
