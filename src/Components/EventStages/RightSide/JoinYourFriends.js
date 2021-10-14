import { React, useEffect, useContext } from "react";
import JoinYourFriendsPic from "../../../Assets/JoinYourFriendsPic.gif";
import classes from "./JoinYourFriends.module.css";
import { AuthContext } from "../../../Auth/AuthProvider";
import { editEvent } from "../../../Firestore/DatabaseManager";
import { useHistory } from "react-router";

// Autocomplete Search
import AutocompleteSearch from "../../../Maps/AutocompleteSearch";
import { LoginModal } from "../../Modals/LoginModal";
// import useNearbySearch from '../../../Maps/NearbySearch'

export default function JoinYourFriends(props) {
<<<<<<< Updated upstream
  
  const currentEvent = props.event;
  const history = useHistory();
  
  let updatedLat = currentEvent.totalCoordinates[0]
  let updatedLong = currentEvent.totalCoordinates[1]
  const { currentUser } = useContext(AuthContext);
  let currentUserDetails = {"name": currentUser.displayName, "id":  currentUser.uid, }
  console.log(currentUserDetails)
  let updatedParticipantsID = currentEvent.participantsID
  console.log(updatedParticipantsID)
  
  const joinWithCustomLocationHandler = (location) => {
    console.log(location)
    console.log(location.lat)
    console.log(location.lng)
    finishJoiningEvent(location)
  } 

  const finishJoiningEvent = async (location) => {
    console.log(currentEvent)
    console.log(location)
    updatedLat += location.lat
    updatedLong += location.lng
    updatedParticipantsID.push(currentUserDetails)
    console.log(updatedParticipantsID)

    let updatedEvent = {
      ...currentEvent,
      totalCoordinates: [updatedLat, updatedLong]
      //add participant ID
      
    }
    console.log(updatedEvent)
    await submitHandler(updatedEvent)
    history.push("/home");
  }

  const currentLocationHandler = (e) => {
    console.log(e)
    navigator.geolocation.getCurrentPosition(success, error, options)
  }

   //some random options for the geolocation call
   var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  

  //success callback for geolocation call
  const success = async (pos) => {
    updatedLat += pos.coords.latitude
    updatedLong += pos.coords.longitude
    updatedParticipantsID.push(currentUserDetails)
    console.log(updatedParticipantsID)

    let updatedEvent = {
      ...currentEvent,
      totalCoordinates: [updatedLat, updatedLong]
    }
    console.log(updatedEvent)
    await submitHandler(updatedEvent)
    history.push("/home");
  }

  //error callback for geolocation
  const error = (err) => {
    console.log("ERROR", err);
  }
  
  const submitHandler = async (event) => {
    console.log(event)
    await editEvent(event);
  }
  
=======
  const joinWithCustomLocationHandler = (location) => {
    console.log(location);
    console.log(location.lat);
    console.log(location.lng);
    // yo daniel this is wired up to the "Join" button for the text box, will
    // return the location if the user chose from the drop down list
  };
>>>>>>> Stashed changes

  return (
    <div className={classes.root}>
      {!props.authed && <LoginModal setAuthed={props.setAuthed} />}
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
        <button className={classes.button1} onClick={currentLocationHandler}>Join with Current Location</button>
        {/* <h3 className={classes.text3}>or</h3> */}
        <div className={classes.searchBoxContainer}>
          <AutocompleteSearch
            placeholder='Join with custom location'
            buttonText='Join!'
            errorTextColor='white'
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
