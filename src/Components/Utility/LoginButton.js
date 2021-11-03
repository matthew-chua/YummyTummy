import React from 'react'
import googleLogo from "../../Assets/google_logo.svg";
import classes from './LoginButton.module.css';
import { signInWithGoogleAuth, provider, auth } from '../../Auth/auth';

export default function LoginButton(props) {

    const authHandler = async () => {
        const response = await signInWithGoogleAuth();
        if (response){
            if (props.onSuccessfulLogin){
                props.onSuccessfulLogin();
            }
        }else{
            if (props.onFailure){
                props.onFailure();
            }
        }
      };


    return (
        <button onClick={authHandler} className={classes.btn}>
            <div className={classes.btnContainer}>
            <img className={classes.googleLogo} src={googleLogo} />
            <div className={classes.btnText}>Sign in with Google</div>
            </div>
        </button>
    )
}
