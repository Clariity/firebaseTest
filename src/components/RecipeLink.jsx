import React, { useContext } from "react";
import { StoreContext } from "../store/store";
import { useHistory } from "react-router-dom";

function RecipeLink({ recipe, index }) {
  const { state } = useContext(StoreContext);
  let history = useHistory();

  function handlePinned() {
    console.log(index);
    let recipes = [];
    let newRecipes = [...state.userData.recipes];
    newRecipes[index].pinned = !recipe.pinned;
    recipes = newRecipes;
    state.firebaseApp.firestore().collection("users").doc(state.user.uid).set(
      {
        recipes: recipes,
      },
      { merge: true }
    );
  }

  return (
    <div
      className="list-item"
      onClick={() =>
        history.push(
          "/recipe?r=" + recipe.name.replace(/\s/g, "").toLowerCase()
        )
      }
    >
      <img
        className="list-item-image"
        src={recipe.imageURL === null ? "./images/logo.png" : recipe.imageURL}
        alt={recipe.name}
      />
      <div className="list-item-details">
        <div className="recipe-name">{recipe.name}</div>
        <div>
          {recipe.servings + (recipe.servings === 1 ? " Serving" : " Servings")}
        </div>
        <div className="list-item-tags">
          {recipe.tags.map((tag, index) => {
            return (
              <div
                className="recipe-tag"
                key={tag + "_" + index}
                onClick={(event) => {
                  history.push("/search?m=include&l=1&t0=" + tag);
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
          className={
            recipe.pinned
              ? "material-icons list-item-pin-button"
              : "material-icons list-item-pin-button unpinned"
          }
          onClick={(event) => {
            handlePinned();
            event.stopPropagation();
          }}
        >
          push_pin
        </div>
      </div>
    </div>
  );
}

export default RecipeLink;
