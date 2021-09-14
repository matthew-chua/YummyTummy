import React from "react";
import { useState } from "react";
import { auth } from "../Auth/auth";
import classes from "./Page.module.css";

//assets
import speakerPic from "../Assets/announcement.png";
//components
import CreateEventModal from "../Components/Modals/CreateEventModal";
import Event from "../Components/Event";

export default function HomePage() {
  const DUMMYDATA = [
    {
      eventTitle: "Supper",
      location: "Extension",
      dateTime: "22:00, 24/10/21",
      participants: ["Matthew (Host)", "Colin", "Grace"],
    },
    {
      eventTitle: "Lunch",
      location: "NorthHill",
      dateTime: "12:00, 28/10/21",
      participants: ["Matthew (Host)", "Colin", "Grace"],
    },
  ];

  const [createEventModal, setCreateEventModal] = useState(false);

  const createEventModalHandler = () => {
    setCreateEventModal(!createEventModal);
  };

  return (
    <div className={classes.page}>
      <div className={classes.leftContainer}>
        <p>Hello {auth.currentUser.displayName}</p>
        <h3 className={classes.subtitle}>My Events</h3>
        <p>Upcoming Events</p>
        {DUMMYDATA.map((event, index) => (
          <Event title={event.eventTitle} location={event.location} dateTime={event.dateTime} participants={event.participants}/> 
        ))}
      </div>
      <div className={classes.rightContainer}>
        <div
          onClick={createEventModalHandler}
          className={classes.createEventButton}
        >
          <img src={speakerPic} className={classes.pic} />
          <div>
            <h2>jio your friends!</h2>
            <p>Click here to create an event!</p>
          </div>
        </div>

        <p>Previous Events</p>
      </div>
      {createEventModal && (
        <CreateEventModal toggle={createEventModalHandler} />
      )}
    </div>
  );
}
