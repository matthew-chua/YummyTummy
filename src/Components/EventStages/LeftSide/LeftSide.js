import React from "react";
import { useState } from "react";

//components
import Invite from "./Invite";
import Locations from "./Locations";
import Participants from "./Participants";
import EditEventModal from "../../Modals/EditEventModal";

//css
import classes from "./LeftSide.module.css";

export default function LeftSide(props) {


  const DUMMYDATA = {
    eventTitle: "Supper",
    dateTime: "24 Aug, 19:00",
    eatery: "To be Confirmed",
    eventID: "red-frog97",
    participants: ["matthew", "ivan", "daniel", "grace"],
  };
  
  const DUMMYLOCATIONS = [
    {
      name: "Koufu",
      location: "North Spine",
      rating: 2.8,
      reviews: 322,
      address: "638A Jurong West Street 61, #01-22, Pioneer Mall, Singapore",
      openingHours: "10:00 - 19:00",
    },
    {
      name: "Collins Grill",
      location: "Jurong Point",
      rating: 4.0,
      reviews: 32,
      address: "638A Jurong West Street 61, #01-22, Pioneer Mall, Singapore",
      openingHours: "12:00 - 19:00",
    },
  ];

  const [editEvent, setEditEvent] = useState(false);

  const editEventHandler = () => {
    setEditEvent(prev=>(!prev));
  }

  return (
    <div className={classes.root}>
       {editEvent && <EditEventModal toggle={editEventHandler}/>}
      <div className={classes.top}>
        <div>
          <h1 className={classes.title}>{DUMMYDATA.eventTitle}</h1>
          <p className={classes.text}> 📅 {DUMMYDATA.dateTime}</p>
          <p className={classes.text}> 📍 {DUMMYDATA.eatery}</p>
        </div>

        {/* need to change this to the icon */}
        {props.pageState === 0 && <p className={classes.editIcon} onClick={editEventHandler}>edit</p>}
      </div>

      {props.pageState === 0 && (
        <div>
          <Invite id={DUMMYDATA.eventID}/>
          <Participants participants={DUMMYDATA.participants} />
        </div>
      )}

      {props.pageState === 1 && <Locations locations={DUMMYLOCATIONS} />}

      {props.pageState === 2 && (
        <Participants participants={DUMMYDATA.participants} />
      )}

      {(props.pageState === 3 || props.pageState === 4) && (
        <div>
          <Invite id={DUMMYDATA.eventID}/>
          <Participants participants={DUMMYDATA.participants} />
        </div>
      )}
    </div>
  );
}
