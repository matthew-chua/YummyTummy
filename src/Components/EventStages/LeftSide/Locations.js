import React from "react";

//css
import classes from "./Locations.module.css";

export default function Locations(props) {
  
  return (
    <div>
      <h1 className={classes.title}>Our Recommendations</h1>
      {props.locations.map((location, index) => (
        <div className={classes.locationCard}>
          <div>
            <p className={classes.text}>
              {location.name} @ {location.location}
            </p>
            <p className={classes.text}>{parseFloat(location.rating)}</p>
          </div>

          <i className={"fa fa-chevron-right"}></i>
        </div>
      ))}
    </div>
  );
}
