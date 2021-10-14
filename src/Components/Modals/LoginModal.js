import React from "react";
import { useState, useContext, useEffect } from "react";
import classes from "./LoginModal.module.css";
import { signInWithGoogleAuth, provider, auth } from "../../Auth/auth";
import { AuthContext } from "../../Auth/AuthProvider";
import googleLogo from "../../Assets/google_logo.svg";

export const LoginModal = (props) => {
  const { currentUser } = useContext(AuthContext);

  // CHECK IF THIS IS CORRECT
  const getAuth = async () => {
    const response = await signInWithGoogleAuth(auth, provider);
    response && props.setAuthed(true);
  };
  // sign in
  // const signInWithGoogleHandler = () => {
  //   signInWithGoogleAuth(auth, provider);
  //   currentUser && setShowPopup(false); // need to wait async here
  // };

  const [showPopup, setShowPopup] = useState(true);

  return (
    <>
      {showPopup && (
        <div className={classes.root}>
          <div className={classes.modal}>
            <div className={classes.card}>
              <div className={classes.paddingDiv}>
                <div className={classes.header}>
                  <div className={classes.headerText}>
                    Before you continue, you need to sign in!
                  </div>
                </div>
                <button onClick={getAuth} className={classes.btn}>
                  <div className={classes.btnContainer}>
                    <img className={classes.googleLogo} src={googleLogo} />
                    <div className={classes.btnText}>Sign in with Google</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className={classes.overlay}></div>
        </div>
      )}
    </>
  );
};

const Popup = () => {};
