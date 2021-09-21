import React from "react";
import { useState } from "react";
import pic from "../../../Assets/location_by_Icons8.gif";

import classes from "./CuratedLocation.module.css";

export default function HostSearch() {
  const [ratings, setRatings] = useState(50);

  return (
    <div className={classes.root}>
      <img src={pic} className={classes.img} />

      <div className={classes.text}>
        <h4 className={classes.title}>Koufu @ NorthSpine</h4>
        <p className={classes.address}>
          638A Jurong West Street 61, #01-22, Pioneer Mall, Singapore
        </p>
        <div className={classes.rating}>
          <p className={classes.ratingsText}>2.0</p>
          <div className={classes.outer}>
            <div
              style={{ width: `${ratings}%` }}
              className={classes.inner}
            ></div>
          </div>
        </div>
        <p className={classes.ratingsText}>332 reviews</p>
      </div>
      <div className={classes.btnGroup}>
        <button className={classes.btn}>Open in Google Maps</button>
        <button className={classes.btn}>Copy Postal Code</button>
      </div>
    </div>
  );
}
