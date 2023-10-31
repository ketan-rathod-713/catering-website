
// Import the functions you need from the SDKs you need
import { GoogleAuthProvider, getAuth, signInWithPopup } from "@firebase/auth";
import {initializeApp} from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCRG8rJ82M18u5W45KX3vJyH_G1IDtvZkE",
  authDomain: "nakalangcaterers.firebaseapp.com",
  projectId: "nakalangcaterers",
  storageBucket: "nakalangcaterers.appspot.com",
  messagingSenderId: "418393329823",
  appId: "1:418393329823:web:8238cace0bf90a192352aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const signinWithGoogle = ()=>{
  var provider = new GoogleAuthProvider();
  const auth = getAuth();
signInWithPopup(auth, provider)
  .then(async (result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    console.log(user)
    const name = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const phone = user.phoneNumber;

    const accessToken = user.accessToken
    const uid = user.uid;

    // now call backend for verifying it and creating account
    // what i am planning to do // authorise it and create own database and values then return the custom jwt token with extra payload information of accesstoken and all.
    await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({name, email, photoURL, phone, accessToken, uid}),
      headers: {
        "Content-Type": "application/json"
      }
    }) // need to think on it how can i achieve this.
    
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

}
