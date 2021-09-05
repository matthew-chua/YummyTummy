import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

export const provider = new GoogleAuthProvider();
export const auth = getAuth();

export const signInWithGoogleAuth = async (auth, provider) => {
  const res = signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log("success");
      console.log(`user:`, user);
      console.log(`token: ${token}`);
      console.log("credential", credential);
      return true;
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      console.log("failure");
      return false;
    });
    return res;
};

export const onLogout = () => {
    signOut(auth);
}
