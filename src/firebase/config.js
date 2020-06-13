import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB9lh-FI6UWwI3jXVwB6XXlo0g9i29IAMQ",
  authDomain: "recipes-3ace4.firebaseapp.com",
  databaseURL: "https://recipes-3ace4.firebaseio.com",
  projectId: "recipes-3ace4",
  storageBucket: "recipes-3ace4.appspot.com",
  messagingSenderId: "392940948851",
  appId: "1:392940948851:web:aee1d688ca3eae7997c906",
  measurementId: "G-NL8WNRDMS6",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.firestore();

export default firebase;
