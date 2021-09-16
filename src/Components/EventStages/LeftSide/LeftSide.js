import React from "react";

//components
import Invite from "./Invite";
import Locations from "./Locations";
import Participants from "./Participants";

//css
import classes from "./LeftSide.module.css";

export default function LeftSide(props) {
  const DUMMYDATA = [
    {
      eventTitle: "Supper",
      dateTime: "24 Aug, 19:00",
      eatery: "To be Confirmed",
      eventID: "red-frog93",
      participants: ["matthew", "ivan", "daniel", "grace"],
    },
  ];

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

  return (
    <div className={classes.root}>
      {DUMMYDATA.map((event, index) => (
        <div>
          <h1>{event.eventTitle}</h1>
          <p> 📅 {event.dateTime}</p>
          <p> 📍 {event.eatery}</p>
        </div>
      ))}

      {props.pageState == 0 && (
        <>
          <Invite />
          <Participants participants={DUMMYDATA[0].participants} />
        </>
      )}

      {props.pageState == 1 && <Locations locations={DUMMYLOCATIONS}/>}

      {props.pageState == 2 && (
        <Participants participants={DUMMYDATA[0].participants} />
      )}

      {(props.pageState == 3 || props.pageState == 4) && (
        <>
          <Invite />
          <Participants participants={DUMMYDATA[0].participants} />
        </>
      )}



    </div>
  );
}
