import React from "react";
import { useState, useEffect } from "react";
import { usePlaceDetails } from "../../../Maps/UsePlaceDetails";
//components
import Invite from "./Invite";
import Locations from "./Locations";
import Participants from "./Participants";
import EditEventModal from "../../Modals/EditEventModal";
import { getPlaceDetailsForList } from "../../../Maps/UsePlaceDetails";

//css
import classes from "./LeftSide.module.css";
import { listenToEvent } from "../../../Firestore/DatabaseManager";

export default function LeftSide(props) {
  usePlaceDetails();

  

  const [placeDetails, setPlaceDetails] = useState({
    name: "",
    place_id: "",
    rating: "",
    user_ratings_total: "",
    opening_hours: "",
    formatted_address: "",
    address_component: "",
    } 
  )

  useEffect(()=>{
    if (props.event){
      listenToEvent(props.event.eventID, props.setEventState)
    }
  },[props.pageState])

  const didFetchPlaceDetail = (placeDetailsList) => {
    if (!placeDetailsList) {
      //error
      console.log("no place details list")
    } else {
      console.log("Here")
      console.log(placeDetailsList)
      setPlaceDetails(placeDetailsList)
    }
  }

  useEffect(() => {
    if (props.event) {
      getPlaceDetailsForList([props.event.selectedEatery], didFetchPlaceDetail)
    }
  }, [])

  // const DUMMYLOCATIONS = [
  //   {
  //     name: "Koufu",
  //     rating: 2.8,
  //     reviews: 322,
  //     address: "638A Jurong West Street 61, #01-22, Pioneer Mall, Singapore",
  //     openingHours: "10:00 - 19:00",
  //   },
  //   {
  //     name: "Collins Grill",
  //     rating: 4.0,
  //     reviews: 32,
  //     address: "638A Jurong West Street 61, #01-22, Pioneer Mall, Singapore",
  //     openingHours: "12:00 - 19:00",
  //   },
  // ];

  const [editEvent, setEditEvent] = useState(false);

  const editEventHandler = () => {
    setEditEvent((prev) => !prev);
    setHidden();
  };

  console.log("left side place list: ", props.placeList);

  const event = props.event;

  //get an array of participant names
  let participantNames = [];

  if (event && event.participantsID) {
    event.participantsID.forEach((participant) => {
      participantNames.push(participant.name);
    });
  }
  let date = "";
  let time = "";

  if (event && event.startTime) {
    const newTime = event.startTime.toDate().toString().split(" ");
    date = newTime[0] + ", " + newTime[1] + " " + newTime[2];
    time = newTime[4].substring(0, 5);
  }

  // prevent scrolling when EDIT event modal is open

  const setHidden = () => {
    console.log(document.body.style.overflow);
    if (document.body.style.overflow !== "hidden") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  };
  console.log(event)

  return (
    <div className={classes.root}>
      {editEvent && (
        <EditEventModal event={props.event} toggle={editEventHandler} />
      )}
      <div id="map"></div>
      <div className={classes.top}>
        <div>
          <h1 className={classes.title}>{event && event.eventTitle}</h1>
          <p className={classes.text}> 📅 {date + ", " + time}</p>
          <p className={classes.text}>
            {" "}
            📍{" "}
            {placeDetails && placeDetails.name ? placeDetails.name : "Pending"}
          </p>
        </div>

        {/* need to change this to the icon */}
        {props.pageState === 0 && (
          <p className={classes.editIcon} onClick={editEventHandler}>
            <i class="fa fa-edit"></i>
          </p>
        )}
      </div>

      {props.pageState === 0 && (
        <div>
          <Invite id={props.id} />
          <Participants participants={participantNames} />
        </div>
      )}

      {props.pageState === 1 && (
        <Locations
          locations={props.placeList}
          placeClickHandler={props.placeClickHandler}
          selectedIndex={props.selectedIndex}
        />
      )}

      {props.pageState === 2 && (
        <Participants participants={participantNames} />
      )}

      {(props.pageState === 3 || props.pageState === 4) && (
        <div>
          <Invite id={props.id} />
          <Participants participants={participantNames} />
        </div>
      )}
    </div>
  );
}
