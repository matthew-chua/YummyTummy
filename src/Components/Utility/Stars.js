import React from "react";

import classes from "./Stars.module.css";

export default function Stars(props) {

  // dont remove the id because its wired up to an on click handler -- its damn stupid but ill try to find another way

  const ratingOutOf100 = props.rating ? props.rating * 20 : 0;
  return (
    <div id={props.indexValue} className={classes.rating}>
      <p id={props.indexValue} className={classes.ratingsText}>{`${
        props.rating ? props.rating.toFixed(1) : "NA"
      }`}</p>
      <div id={props.indexValue} className={classes.outer}>
        <div
          id={props.indexValue}
          style={{ width: `${ratingOutOf100}%` }}
          className={classes.inner}
        ></div>
      </div>
    </div>
  );
}
