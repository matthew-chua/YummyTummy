import { useEffect, useContext } from "react";
import { useHistory } from "react-router";
import { signInWithGoogleAuth, provider, auth } from "../Auth/auth";
import { AuthContext } from "../Auth/AuthProvider";

//css
import landingPageClasses from "./LandingPage.module.css";

//assets
import hungryPic from "../Assets/food_dream.png";
import googleLogo from "../Assets/google_logo.svg";

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
    <div className={landingPageClasses.page}>
      <div>
        <h1 className={landingPageClasses.logo}>Yummy Tummy</h1>
        <h2 className={landingPageClasses.subtitle}>not sure where to eat?</h2>
        <p>
          fret not, Yummy Tummy is here to help you and your best friends find
          new places to dine!
        </p>

        <div>
          <div>
            <button
              onClick={signInWithGoogleHandler}
              className={landingPageClasses.btn}
            >
              <div className={landingPageClasses.btnContainer}>
                <img className={landingPageClasses.googleImg} src={googleLogo} />
                <div className={landingPageClasses.btnText}>
                  Sign in With Google
                </div>
              </div>
            </button>
          </div>

          <p>log in now to jio your friends!</p>
        </div>
      </div>

      <div className={landingPageClasses.rightContainer}>
        <img src={hungryPic} className={landingPageClasses.pic} />
      </div>
    </div>
  );
}
