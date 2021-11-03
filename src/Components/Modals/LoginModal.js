import React from "react";
import { useState, useContext, useEffect } from "react";
import classes from "./LoginModal.module.css";
// import { signIn, provider, auth } from "../../Auth/auth";
import { AuthContext } from "../../Auth/AuthProvider";
import googleLogo from "../../Assets/google_logo.svg";
import LoginButton from "../Utility/LoginButton";

export const LoginModal = (props) => {

  const onLoginSuccess = () => {
    props.setAuthed(true);
  }
  
  return (
    <div className={classes.root}>
      <div className={classes.modal}>
        <div className={classes.card}>
          <div className={classes.paddingDiv}>
            <div className={classes.header}>
              <div className={classes.headerText}>
                Before you continue, you need to sign in!
              </div>
            </div>
            <LoginButton onSuccessfulLogin={onLoginSuccess} />
          </div>
        </div>
      </div>
      <div className={classes.overlay}></div>
    </div>
  );
};

const Popup = () => {};
