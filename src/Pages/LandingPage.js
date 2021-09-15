import { useEffect, useContext } from "react";
import { useHistory } from "react-router";
import { signInWithGoogleAuth, provider, auth } from "../Auth/auth";
import { AuthContext } from "../Auth/AuthProvider";
import pageClasses from "./Page.module.css";
import landingPageClasses from "./LandingPage.module.css";

import logo from "../Assets/YummyTummyLogo.svg";
import hungryPic from "../Assets/food_dream.svg";
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
        <img src={logo} className={landingPageClasses.logo} />
        <h4 className={landingPageClasses.h4}>not sure where to eat?</h4>
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
                <img className={landingPageClasses.img} src={googleLogo} />
                <div className={landingPageClasses.btnText}>
                  Sign in With Google
                </div>
              </div>
            </button>
          </div>

          <p>log in now to jio your friends!</p>
        </div>
      </div>

      <div>
        <img src={hungryPic} className={landingPageClasses.pic} />
      </div>
    </div>
  );
}
