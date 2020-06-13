import React, { useContext, useEffect, useState } from "react";
import { StoreContext, ActionType } from "../store/store";
import { useHistory, useLocation } from "react-router-dom";
import FormTop from "./FormComponents/FormTop";
import FormBottom from "./FormComponents/FormBottom";
import OverwriteModal from "./Modals/OverwriteModal";
import DeleteModal from "./Modals/DeleteModal";
import ResetModal from "./Modals/ResetModal";
import NoPictureModal from "./Modals/NoPictureModal";

function Add() {
  const { state, dispatch } = useContext(StoreContext);
  const [tagsSelected, setTagsSelected] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [showOverwriteModal, setShowOverwriteModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showNoPictureModal, setShowNoPictureModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    servings: 0,
    cookingTime: 0,
    ingredients: [
      {
        amount: 0,
        unit: "",
        ingredient: "",
      },
      {
        amount: 0,
        unit: "",
        ingredient: "",
      },
      {
        amount: 0,
        unit: "",
        ingredient: "",
      },
    ],
    instructions: ["", ""],
    notes: ``,
    //imageURL: downloadURL,
    tags: [],
    //pinned: true,
  });
  let history = useHistory();
  let location = useLocation();

  // need to reset fields on history change
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const recipeName = params.get("r");
    if (recipeName === null) {
      dispatch({ type: ActionType.SET_TITLE, payload: "New Recipe" });
      resetRecipe();
    } else {
      for (let r in state.userData.recipes) {
        if (
          state.userData.recipes[r].name.replace(/\s/g, "").toLowerCase() ===
          recipeName
        ) {
          dispatch({
            type: ActionType.SET_TITLE,
            payload: state.userData.recipes[r].name,
          });
          setNewRecipe(state.userData.recipes[r]);
          setPhotoURL(state.userData.recipes[r].imageURL); // This value is null if no image uploaded
          setTagsSelected(state.userData.recipes[r].tags);
        }
      }
    }
  }, [dispatch, state.userData, location.search]);

  function handleChange(event) {
    setNewRecipe({
      ...newRecipe,
      [event.target.name]: event.target.value,
    });
  }

  // checl if recipe name already exists, return result and index
  function recipeExists() {
    for (let r in state.userData.recipes) {
      if (
        state.userData.recipes[r].name.replace(/\s/g, "").toLowerCase() ===
        newRecipe.name.replace(/\s/g, "").toLowerCase()
      ) {
        return [true, r];
      }
    }
    return [false, 0];
  }

  const deleteRecipe = () => {
    console.log("delete");
  };

  const resetRecipe = () => {
    setNewRecipe({
      name: "",
      servings: 0,
      cookingTime: 0,
      ingredients: [
        {
          amount: 0,
          unit: "",
          ingredient: "",
        },
        {
          amount: 0,
          unit: "",
          ingredient: "",
        },
        {
          amount: 0,
          unit: "",
          ingredient: "",
        },
      ],
      instructions: ["", ""],
      notes: ``,
      tags: [],
    });
    setSelectedFile(null);
    setPhotoURL(null);
    setTagsSelected([]);
  };

  /**
   * A recipe can be uploaded with 3 conditions:
   * 1. a fresh upload
   * 2. overwriting/editing a previous upload
   * 3. fresh/overwriting with no picture
   * */

  const uploadRecipe = (downloadURL = photoURL) => {
    let tags = [];
    let recipes = [];

    // set tags for recipe and add any new global tags
    let newTags = [...state.userData.tags];
    for (let t in tagsSelected) {
      if (typeof tagsSelected[t] === "object") {
        tags.push(tagsSelected[t].label);
        newTags.push(tagsSelected[t].label);
      } else {
        tags.push(tagsSelected[t]);
      }
    }

    const exists = recipeExists();
    const recipeStructure = {
      ...newRecipe,
      tags: tags,
      pinned: true, //just for testing, change back to false by default
      imageURL: downloadURL, // set to photoURL in function arguments, this is set on component load when identified as current recipe
      lastUpdated: new Date(),
    };
    if (exists[0]) {
      //overwrite recipe
      let newRecipes = [...state.userData.recipes];
      newRecipes[exists[1]] = recipeStructure;
      recipes = newRecipes;
    } else {
      // add recipe
      recipes = [...state.userData.recipes, recipeStructure];
    }

    // upload recipe
    state.firebaseApp.firestore().collection("users").doc(state.user.uid).set(
      {
        recipes: recipes,
        tags: newTags,
      },
      { merge: true }
    );

    // redirect after upload
    history.push("/home");
  };

  const handleUploadProgress = (snapshot) => {
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log("Upload is " + progress + "% done");
    switch (snapshot.state) {
      case "paused":
        console.log("Upload is paused");
        break;
      case "running":
        console.log("Upload is running");
        break;
      default:
        break;
    }
  };

  const handleUploadError = (error) => {
    switch (error.code) {
      case "storage/unauthorized":
        break;
      case "storage/canceled":
        break;
      case "storage/unknown":
        break;
      default:
        break;
    }
  };

  // Once photo is uploaded, remote URL with be returned, upload recipe with remote URL
  const handleUploadCompletion = (uploadTask) => {
    uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
      uploadRecipe(downloadURL);
    });
  };

  // Upload photo to firestore, name it as recipe name
  const uploadPhoto = () => {
    const uploadTask = state.firebaseApp
      .storage()
      .ref()
      .child("recipe-images/" + newRecipe.name.replace(/\s/g, "").toLowerCase()) //prefix state.user.uid for multiple users
      .put(selectedFile);

    uploadTask.on(
      "state_changed",
      handleUploadProgress,
      handleUploadError,
      () => handleUploadCompletion(uploadTask)
    );
  };

  const handleUpload = () => {
    // Check if recipe exists with the same name as current recipe
    const exists = recipeExists();
    if (exists[0]) {
      //overwriting current recipe or writing new recipe with name that already exists, check with modal for confirmation
      setShowOverwriteModal(true);
    } else if (selectedFile !== null) {
      //new recipe with photo selected, can safely upload
      uploadPhoto();
    } else if (photoURL !== null) {
      //new recipe made from previous recipe but with name change and photo selected, can safely upload
      uploadRecipe();
    } else {
      // new recipe with no photo selected, confirm with user if they wish to upload with no image
      setShowNoPictureModal(true);
    }
  };

  const validateFields = () => {
    return (
      newRecipe.name === "" ||
      newRecipe.servings <= 0 ||
      newRecipe.cookingTime <= 0 ||
      newRecipe.ingredients[0].amount === 0 ||
      newRecipe.ingredients[0].unit === "" ||
      newRecipe.ingredients[0].ingredient === "" ||
      tagsSelected.length === 0
    );
  };

  return (
    <div className="add">
      <OverwriteModal
        showOverwriteModal={showOverwriteModal}
        setShowOverwriteModal={setShowOverwriteModal}
        recipeName={newRecipe.name}
        uploadRecipe={uploadRecipe}
      />
      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        recipeName={newRecipe.name}
        deleteRecipe={deleteRecipe}
      />
      <NoPictureModal
        showNoPictureModal={showNoPictureModal}
        setShowNoPictureModal={setShowNoPictureModal}
        recipeName={newRecipe.name}
        uploadRecipe={uploadRecipe}
      />
      <ResetModal
        showResetModal={showResetModal}
        setShowResetModal={setShowResetModal}
        recipeName={newRecipe.name}
        resetRecipe={resetRecipe}
      />
      <div className="add-container">
        <FormTop
          newRecipe={newRecipe}
          setNewRecipe={setNewRecipe}
          setSelectedFile={setSelectedFile}
          photoURL={photoURL}
          setPhotoURL={setPhotoURL}
          handleChange={handleChange}
        />
        <FormBottom
          newRecipe={newRecipe}
          setNewRecipe={setNewRecipe}
          tagsSelected={tagsSelected}
          setTagsSelected={setTagsSelected}
          handleChange={handleChange}
        />
        <div className="upload-button-group">
          <button
            className="upload-button"
            onClick={handleUpload}
            disabled={validateFields()}
          >
            Upload
          </button>
          <div className="reset-button" onClick={() => setShowResetModal(true)}>
            Reset
          </div>
          <div
            className="discard-button"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete
          </div>
          <div className="discard-button" onClick={() => history.push("/home")}>
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
}

export default Add;
