import React from "react";

import classes from "./Stars.module.css";

export default function Stars(props) {
  const ratingOutOf100 = props.rating ? props.rating * 20 : 0;
  return (
    <div className={classes.rating}>
      <p className={classes.ratingsText}>{`${props.rating ? props.rating.toFixed(1) : "NA"}`}</p>
      <div className={classes.outer}>
        <div
          style={{ width: `${ratingOutOf100}%` }}
          className={classes.inner}
        ></div>
      </div>
    </div>
  );
}
