import { useEffect, useContext } from "react";
import { useHistory } from "react-router";
import { signInWithGoogleAuth, provider, auth } from "../Auth/auth";
import { AuthContext } from "../Auth/AuthProvider";

//css
import landingPageClasses from "./LandingPage.module.css";

//assets
import hungryPic from "../Assets/food_dream.png";
import googleLogo from "../Assets/google_logo.svg";
import LoginButton from "../Components/Utility/LoginButton";

export default function WelcomePage() {
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);

  // redirect away from home
  useEffect(() => {
    if (!!currentUser) {
      history.push("/home");
    }
  }, [currentUser]);

  return (
    <div className={landingPageClasses.page}>
      <div>
        <h1 className={landingPageClasses.logo}>Yummy Tummy</h1>
        <h2 className={landingPageClasses.subtitle}>not sure where to eat?</h2>
        <p>
          fret not, Yummy Tummy is here to help you and your best friends find
          new places to dine!
        </p>
        <div>
          <LoginButton />
          <p>log in now to jio your friends!</p>
        </div>
      </div>
      <div className={landingPageClasses.rightContainer}>
        <img src={hungryPic} className={landingPageClasses.pic} />
      </div>
    </div>
  );
}
