import React, { useContext, useEffect, useState } from "react";
import { StoreContext, ActionType } from "../store/store";
import { Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { useLocation, useHistory } from "react-router-dom";

function Search() {
  const { state, dispatch } = useContext(StoreContext);
  const [foundRecipes, setFoundRecipes] = useState([]);
  const [recipeNames, setRecipeNames] = useState([]);
  const [componentParams, setComponentParams] = useState(null);
  const [searchType, setSearchType] = useState("r");
  const [combineTags, setCombineTags] = useState(false);
  const [tagsSelected, setTagsSelected] = useState([]);
  let location = useLocation();
  let history = useHistory();

  useEffect(() => {
    if (state.user === null) history.push("/");
    dispatch({ type: ActionType.SET_TITLE, payload: "Search" });
    const params = new URLSearchParams(location.search);
    setComponentParams(params);
    const recipeName = params.get("r");
    const mode = params.get("m");
    const length = params.get("l");
    let newFoundRecipes = [];
    let newRecipeNames = [];
    let urlTags = [];

    if (length !== null) {
      //get all tags
      for (let t = 0; t < length; t++) {
        urlTags.push(params.get("t" + t));
      }
    }

    for (let r in state.userData.recipes) {
      // add name to typeahead options
      newRecipeNames.push(state.userData.recipes[r].name);
      //if a matching string
      if (
        state.userData.recipes[r].name
          .replace(/\s/g, "")
          .toLowerCase()
          .includes(recipeName)
      ) {
        newFoundRecipes.push(state.userData.recipes[r]);
      }

      //recipe must contain all tags
      if (mode === "combine") {
        let addRecipe = true;
        for (let t in urlTags) {
          if (!state.userData.recipes[r].tags.includes(urlTags[t])) {
            addRecipe = false;
            break;
          }
        }
        if (addRecipe) {
          newFoundRecipes.push(state.userData.recipes[r]);
        }
      } else {
        // recipe must contain at least 1 tag
        for (let t = 0; t < urlTags.length; t++) {
          if (state.userData.recipes[r].tags.includes(urlTags[t])) {
            newFoundRecipes.push(state.userData.recipes[r]);
            break;
          }
        }
      }
    }

    setFoundRecipes(newFoundRecipes);
    setRecipeNames(newRecipeNames);
  }, [dispatch, state.userData, location.search, history, state.user]);

  const handleSearchTags = () => {
    let urlString = "/search?m=";
    urlString = urlString + (combineTags ? "combine" : "include");
    urlString = urlString + "&l=" + tagsSelected.length;
    for (let i = 0; i < tagsSelected.length; i++) {
      urlString = urlString + "&t" + i + "=" + tagsSelected[i];
    }
    history.push(urlString);
  };

  return componentParams !== null &&
    componentParams.get("r") === null &&
    componentParams.get("m") === null ? (
    <div className="search">
      <div className="search-box">
        <div className="search-box-options">
          <div
            className={
              "search-button-s " +
              (searchType === "r"
                ? "search-button-selected"
                : "search-button-not-selected")
            }
            data-tip="Add new recipe"
            onClick={() => setSearchType("r")}
          >
            Recipe Name
          </div>
          <div
            className={
              "search-button-s " +
              (searchType === "t"
                ? "search-button-selected"
                : "search-button-not-selected")
            }
            data-tip="Add new recipe"
            onClick={() => setSearchType("t")}
          >
            Recipe Tags
          </div>
        </div>
        <div className="search-box-row">
          {searchType === "r" ? (
            <Typeahead
              id="recipe-name"
              onChange={(selected) => {
                if (typeof selected[0] === "object") {
                  history.push(
                    "/search?r=" +
                      selected[0].label.replace(/\s/g, "").toLowerCase()
                  );
                } else {
                  history.push(
                    "/recipe?r=" + selected[0].replace(/\s/g, "").toLowerCase()
                  );
                }
              }}
              allowNew={true}
              options={recipeNames}
              placeholder="Search by recipe name"
              selected={[]}
            />
          ) : (
            <Typeahead
              id="recipe-tag"
              multiple={true}
              onChange={setTagsSelected}
              options={
                state.userData.tags !== undefined ? state.userData.tags : []
              }
              placeholder="Select by recipe tags"
              selected={tagsSelected}
            />
          )}
          {searchType === "t" && (
            <div
              className={"material-icons complete-search"}
              data-tip="Search"
              onClick={handleSearchTags}
            >
              search
            </div>
          )}
        </div>
        {searchType === "t" && (
          <Form.Check
            checked={combineTags}
            onChange={(e) => setCombineTags(e.target.checked)}
            label="Combo-Tags"
          />
        )}
      </div>
    </div>
  ) : (
    <div className="search">
      <div className="recipe-list">
        {foundRecipes.length > 0 ? (
          foundRecipes.map((recipe, index) => {
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
                              "/search?t=" +
                                tag.replace(/\s/g, "").toLowerCase()
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
          })
        ) : (
          <>
            <div>No results found</div>
            <button
              className="back-to-search"
              onClick={() => history.push("/search")}
            >
              Back to search
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Search;
