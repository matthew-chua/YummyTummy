import React from "react";
import JoinYourFriendsPic from "../../../Assets/JoinYourFriendsPic.gif";
import classes from "./JoinYourFriends.module.css";

// Autocomplete Search
import GoogleMaps from '../../../Maps/GoogleMaps'
// import useNearbySearch from '../../../Maps/NearbySearch'

export default function JoinYourFriends() {
  return (
    <div className={classes.root}>
      <div>
        <img src={JoinYourFriendsPic} className={classes.pic} />
      </div>
      <div>
        <h1 className={classes.join}>Join Your Friends</h1>
        <h3 className={classes.text1}>
          Respond to Matthew’s invite with your location!
        </h3>
        {/* NOTE: STILL NEEDA PASS IN PROPS AND MAKE NAME RESPONSIVE */}
        <h3 className={classes.text2}>
          We’ll take your location into consideration, before suggesting a
          handful of optimal diners for Matthew to choose based on their
          location, reviews and what’s still open at this time!
        </h3>
      </div>
      <div className={classes.bottom}>
        <button className={classes.button1}>Join with Current Location</button>
        {/* <h3 className={classes.text3}>or</h3> */}
        <GoogleMaps />
        {/* <button className={classes.button2}>
          Join with postal code{" "}
          <i style={{ marginLeft: "10px" }} class="fa fa-arrow-right"></i>
        </button> */}
      </div>
    </div>
  );
}
