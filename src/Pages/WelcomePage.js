import { useEffect, useContext } from "react";
import { useHistory } from "react-router";
import { signInWithGoogleAuth, provider, auth } from "../Auth/auth";
import { AuthContext } from "../Auth/AuthProvider";

export default function WelcomePage() {
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);

  // redirect away from home
  useEffect(() => {
    if (!!currentUser) {
      history.push("/home");
    }
  }, [currentUser]);

  // sign in
  const signInWithGoogleHandler = () => {
    signInWithGoogleAuth(auth, provider);
  };

  return (
    <div>
      <h1>This is the landing page</h1>
      <button onClick={signInWithGoogleHandler}>Login</button>
    </div>
  );
}
