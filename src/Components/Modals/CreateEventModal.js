import React from "react";
import { useState, useContext, useEffect } from "react";
import classes from "./CreateEventModal.module.css";
import pic from "../../Assets/eventpic.svg";
import Card from "../Card";
import { AuthContext } from "../../Auth/AuthProvider";

//firebase timestamp stuff
import { Timestamp } from "firebase/firestore";


//id stuff
// import hri from "human-readable-ids";

//network
import {createEvent} from "../../Firestore/DatabaseManager";

export default function CreateEventModal(props) {

  const { currentUser } = useContext(AuthContext);

  const [count, setCount] = useState(0);

  const plusOne = (e) => {
    e.preventDefault();
    if (count < 5) {
      setCount(()=> (count + 1));
      // setEvent({
      //   ...event,
      //   maxParticipants: count,
      // });
    }
  };

  const minusOne = (e) => {
    e.preventDefault();
    if (count > 0) {
      setCount(()=> (count - 1));
      // setEvent({
      //   ...event,
      //   maxParticipants: count,
      // });
    }
  };

  const [event, setEvent] = useState({
    eventID: "",
    eventTitle: "",
    host: {
      id: "",
      name: ""
    },
    maxParticipants: 0,
    participantsID: [],
    placeID: "",
    recommendedEateries: [],
    selectedEatery: "",
    startTime : "",
    totalCoordinates : []

  })

  //updates the event title and startTime in event
  const inputHandler = (e) => {
    e.preventDefault();
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    })
  }

  const [time, setTime] = useState();

  const dateInputHandler = (e) => {
    e.preventDefault();
    let timeStamp = new Timestamp((Date.parse(e.target.value)/1000), 0);
    setTime(timeStamp);
    setEvent({
      ...event,
      startTime: e.target.value,
    })
  }

  //generate the totalCoordinates field, and update event 
  const currentLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(success, error, options)
  }

  //generate the totalCoordinates field, and update event 
  const postalCodeHandler = () => {
    submitHandler();
  }

  //create the unique ID and send it to firebase
  const submitHandler = (event) => {
    // setEvent({
    //   ...event,
    //   host: {
    //     id: currentUser.uid,
    //     name: currentUser.displayName,
    //   },
    //   participantsID: [{
    //     id: currentUser.uid,
    //     name: currentUser.displayName,
    //   }]
    // })
    console.log("HERE", event)
    createEvent(event);
    props.toggle();
    
  }

  

  //success callback for geolocation call
  const success = (pos) => {
    
    let updatedEvent = {
      ...event,
      totalCoordinates: [pos.coords.latitude, pos.coords.longitude],
      eventID: "WHOOP ITS DONE",
      host: {
        id: currentUser.uid,
        name: currentUser.displayName,
      },
      participantsID: [{
        id: currentUser.uid,
        name: currentUser.displayName,
      }],
      maxParticipants: count,
      startTime: time
    }

    // setEvent(updatedEvent);

    submitHandler(updatedEvent); 

    // console.log({
    //   ...event,
    //   totalCoordinate: [pos.coords.latitude, pos.coords.longitude],
    //   eventID: "TESTID",
    // })
    // submitHandler();
  }
  
  //some random options for the geolocation call
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  //error callback for geolocation
  const error = (err) => {
    console.log("ERROR", err);
  }

  // useEffect(()=>{
  //   console.log("useeffect", event)
  // }, [event])

  //gets current date so i can use it to set min in datetime input
  const min = new Date();

  return (
    <div>
      <form className={classes.modal}>
        <Card
          left={
            <div className={classes.leftContainer}>
              <h2>Event Title:</h2>
              <input value={event.eventTitle} name="eventTitle" onChange={inputHandler}/>
              <h2>Date & Time:</h2>
              <input type="datetime-local" min={min.toISOString().substring(0,16)} value={event.startTime} name="startTime" onChange={dateInputHandler}/>

              <div className={classes.maxPax} >
                <h2 className={classes.maxPaxText}>Max Pax:</h2>
                <button className={classes.minusButton} onClick={minusOne}>
                  -
                </button>
                <p className={classes.count}>{count}</p>
                <button className={classes.addButton} onClick={plusOne}>
                  +
                </button>
              </div>

              <div className={classes.vertButtonGroup}>
                <button
                  onClick={currentLocationHandler}
                  className={classes.currentLocationButton}
                  type="button"
                >
                  Create with Current Location
                </button>
                {/* <div className={classes.or}>or</div> */}
                <button
                  onClick={postalCodeHandler}
                  className={classes.joinWithPostalCode}
                  type="button"

                >
                  Create with Postal Code{" "}
                  <i
                    style={{ marginLeft: "10px" }}
                    class="fa fa-arrow-right"
                  ></i>
                </button>

                <button
                  onClick={props.toggle}
                  className={classes.cancelButton}
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </div>
          }
          right={
            <div className={classes.rightContainer}>
              <img src={pic} className={classes.pic} />

              <div className={classes.text}>
                <h3>Create an Event!</h3>
                <p>Fill in the details and hit create when you're done</p>
                <p>
                  Copy your event's unique URL and share it with your friends to
                  invite them!
                </p>
              </div>
            </div>
          }
        />
      </form>
      <div className={classes.overlay} onClick={props.toggle} />
    </div>
  );
}
