import React from "react";
import JoinYourFriendsPic from "../../../Assets/JoinYourFriendsPic.gif";
import classes from "./JoinYourFriends.module.css";

// Autocomplete Search
import AutocompleteSearch from "../../../Maps/AutocompleteSearch";
// import useNearbySearch from '../../../Maps/NearbySearch'

export default function JoinYourFriends() {

  const joinWithCustomLocationHandler = (location) => {
    console.log(location)
    console.log(location.lat)
    console.log(location.lng)
    // yo daniel this is wired up to the "Join" button for the text box, will 
    // return the location if the user chose from the drop down list
  }

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
        <div className={classes.searchBoxContainer}>
          <AutocompleteSearch 
          placeholder="Join with custom location" 
          buttonText="Join!"
          errorTextColor="white"
          searchBoxActionClicked={joinWithCustomLocationHandler}
          />
        </div>
        {/* <button className={classes.button2}>
          Join with postal code{" "}
          <i style={{ marginLeft: "10px" }} class="fa fa-arrow-right"></i>
        </button> */}
      </div>
    </div>
  );
}
