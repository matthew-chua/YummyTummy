import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { createUser } from "../Firestore/DatabaseManager";

export const provider = new GoogleAuthProvider();
export const auth = getAuth();

export const signInWithGoogleAuth = async () => {
  const res = signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // create user
      createUser(user.uid, user.displayName, user.photoURL);
      return true;
    })
    .catch((error) => {
      return false;
    });
    return res;
};

// Handle Errors here.
// const errorCode = error.code;
// const errorMessage = error.message;
// // The email of the user's account used.
// const email = error.email;
// // The AuthCredential type that was used.
// const credential = GoogleAuthProvider.credentialFromError(error);

export const onLogout = () => {
    signOut(auth);
}
