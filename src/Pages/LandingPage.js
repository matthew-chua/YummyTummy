import { useEffect, useContext } from "react";
import { useHistory } from "react-router";
import { signInWithGoogleAuth, provider, auth } from "../Auth/auth";
import { AuthContext } from "../Auth/AuthProvider";
import classes from "./Page.module.css"

import hungryPic from "../Assets/food_dream.svg";

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

      <div>
        <h1>Yummy Tummy</h1>
        <h3>not sure where to eat?</h3>
        <p>fret not, Yummy Tummy is here to help you 
          and your best friends find new places to dine!</p>
      </div>

      <div>
        <button onClick={signInWithGoogleHandler}>Login</button>
        <p>log in now to jio your friends!</p>
      </div>
      
      <div>
        <img src={hungryPic} className={classes.pic}/>
      </div>

    </div>
  );
}
