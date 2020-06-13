import React from "react";

function FormTop({
  newRecipe,
  setNewRecipe,
  setSelectedFile,
  photoURL,
  setPhotoURL,
  handleChange,
}) {
  function handleIngredientsChange(event, index) {
    let ingredients = [...newRecipe.ingredients];
    let ingredient = {
      ...ingredients[index],
      [event.target.name]: event.target.value,
    };
    ingredients[index] = ingredient;
    setNewRecipe({
      ...newRecipe,
      ingredients: ingredients,
    });
  }

  const handleFileChange = (e) => {
    //also check file type here
    //also deal with uploading multiple images
    if (e.target.files.length > 0) {
      if (e.target.files[0].type.toString().indexOf("image/") !== 0) {
        // show error message
        return;
      } else {
        setSelectedFile(e.target.files[0]);
        setPhotoURL(URL.createObjectURL(e.target.files[0]));
      }
    }
  };

  const addIngredientRow = () => {
    let ingredients = [...newRecipe.ingredients];
    ingredients.push({
      amount: 0,
      unit: "",
      ingredient: "",
    });
    setNewRecipe({
      ...newRecipe,
      ingredients: ingredients,
    });
  };

  return (
    <div className="form-top">
      <div className="form-top-data">
        <div className="input-label-container">
          <label>Recipe Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            // onBlur={handleBlur}
            value={newRecipe.name}
            autoComplete="off"
          />
        </div>
        <div className="form-top-servings-cooking">
          <div className="input-label-container">
            <label>Servings</label>
            <input
              type="number"
              name="servings"
              onChange={handleChange}
              // onBlur={handleBlur}
              value={newRecipe.servings}
              autoComplete="off"
            />
          </div>
          <div className="input-label-container">
            <label>Cooking Time</label>
            <div className="input-span-container">
              <input
                type="number"
                name="cookingTime"
                onChange={handleChange}
                // onBlur={handleBlur}
                value={newRecipe.cookingTime}
                autoComplete="off"
              />
              <span className="unit">Minutes</span>
            </div>
          </div>
        </div>
        <div className="input-label-container">
          <label>Ingredients</label>
          <div className="ingredient-label-container">
            <label>#</label>
            <label>Unit</label>
            <label>Ingredient</label>
          </div>
          <div className="ingredient-input-container">
            {newRecipe.ingredients.map((ing, index) => {
              return (
                <div className="ingredient-inputs" key={index}>
                  <input
                    type="number"
                    name="amount"
                    onChange={(event) => handleIngredientsChange(event, index)}
                    // onBlur={handleBlur}
                    value={ing.amount}
                    autoComplete="random"
                  />
                  <input
                    type="text"
                    name="unit"
                    onChange={(event) => handleIngredientsChange(event, index)}
                    // onBlur={handleBlur}
                    value={ing.unit}
                    autoComplete="random"
                  />
                  <input
                    type="text"
                    name="ingredient"
                    onChange={(event) => handleIngredientsChange(event, index)}
                    // onBlur={handleBlur}
                    value={ing.ingredient}
                    autoComplete="random"
                  />
                </div>
              );
            })}
          </div>
          <div
            className="add-row-button"
            data-tip="Add another row for an ingredient"
            onClick={addIngredientRow}
          >
            <i className="material-icons">add</i>
            More ingredients
          </div>
        </div>
      </div>
      <div className="form-top-picture">
        <img
          className="upload-image"
          src={photoURL !== null ? photoURL : "./images/no-picture.svg"}
          alt=""
        />
        <div className="picture-upload-buttons">
          <label htmlFor="file-upload">
            <i
              className="material-icons picture-icons"
              data-tip="Upload picture from files"
            >
              add_photo_alternate
            </i>
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            accept="image/*"
          />
          <i
            className="material-icons picture-icons"
            data-tip="Clear current picture"
            onClick={() => setPhotoURL(null)}
          >
            clear
          </i>
        </div>
      </div>
    </div>
  );
}

export default FormTop;
