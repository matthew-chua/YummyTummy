import React from "react";
import { useState } from "react";
import pic from "../../../Assets/location_by_Icons8.gif";
import Stars from "../../Utility/Stars";

import classes from "./CuratedLocation.module.css";

export default function HostSearch() {
  // ratings must be out of 5.0, pass into stars
  // made it reusable because i need use for left side also cheers -ivan
  const [ratings, setRatings] = useState(2.0);
  // actually u might not even need this state, can just take directly from props, but see how you wanna do it

  return (
    <div className={classes.root}>
      <img src={pic} className={classes.img} />

      <div className={classes.text}>
        <h4 className={classes.title}>Koufu @ NorthSpine</h4>
        <p className={classes.address}>
          638A Jurong West Street 61, #01-22, Pioneer Mall, Singapore
        </p>
        <Stars rating={ratings} />
        <p className={classes.ratingsText}>332 reviews</p>
      </div>
      <div className={classes.btnGroup}>
        <button className={classes.btn}>Open in Google Maps</button>
        <button className={classes.btn}>Copy Postal Code</button>
      </div>
    </div>
  );
}
