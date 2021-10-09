import React from "react";
import { useState, useEffect } from "react";

//components
import Invite from "./Invite";
import Locations from "./Locations";
import Participants from "./Participants";
import EditEventModal from "../../Modals/EditEventModal";

//css
import classes from "./LeftSide.module.css";

export default function LeftSide(props) {
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
  };

  const event = props.event;

  //get an array of participant names
  let participantNames = [];

  if (event.participantsID) {
    event.participantsID.forEach((participant) => {
      participantNames.push(participant.name);
    });
  }
  let date = "";
  let time = "";

  if (event.startTime) {
    const newTime = event.startTime.toDate().toString().split(" ");
    date = newTime[0] + ", " + newTime[1] + " " + newTime[2];
    time = newTime[4].substring(0, 5);
  }

  return (
    <div className={classes.root}>
      {editEvent && <EditEventModal toggle={editEventHandler} />}
      <div id="map"></div>
      <div className={classes.top}>
        <div>
          <h1 className={classes.title}>{event.eventTitle}</h1>
          <p className={classes.text}> 📅 {date + ", " + time}</p>
          <p className={classes.text}>
            {" "}
            📍 {event.selectedEatery ? event.selectedEatery : "Pending"}
          </p>
        </div>

        {/* need to change this to the icon */}
        {props.pageState === 0 && (
          <p className={classes.editIcon} onClick={editEventHandler}>
            edit
          </p>
        )}
      </div>

      {props.pageState === 0 && (
        <div>
          <Invite id={props.id} />
          <Participants participants={participantNames} />
        </div>
      )}

      {props.pageState === 1 && <Locations locations={props.placeList} placeClickHandler={props.placeClickHandler} selectedIndex={props.selectedIndex}/>}

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
