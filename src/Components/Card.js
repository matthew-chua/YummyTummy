import React from "react";
import classes from "./Card.module.css";

export default function Card(props) {
  return (
    <div className={classes.root}>
      <div className={classes.card}>
        <div className={classes.leftContainer}>
          <div className={classes.paddingDiv}>{props.left}</div>
        </div>
        <div className={classes.rightContainer}>
          <div className={classes.paddingDiv}>{props.right}</div>
        </div>
      </div>
    </div>
  );
}
