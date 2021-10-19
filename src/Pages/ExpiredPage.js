import React from 'react'

//css
import classes from "./ExpiredPage.module.css";

//assets
import error from "../Assets/error.gif";


export default function ExpiredPage() {
    return (
        <div className={classes.page}>
            <div className={classes.left}>
            <h1 className={classes.logo}>Yummy Tummy</h1>
            <p className={classes.text}>Sorry, this event has either expired or been deleted by the host. 🙁</p>
            </div>
            <div className={classes.right}>
            <img src={error} className={classes.img}/>
            </div>
        </div>
    )
}
