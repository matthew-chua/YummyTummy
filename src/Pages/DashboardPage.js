import React from "react";
import { useState, useEffect } from "react";
import { auth } from "../Auth/auth";
import classes from "./Page.module.css";
import { getEvents } from "../Firestore/DatabaseManager";

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
    setCreateEventModal(prev=>(!prev));
  };

  useEffect(async () => {
    getEvents();
  }, []);

  return (
    <div className={classes.page}>
      {/* <p>Hello {auth.currentUser.displayName}</p> */}
      <div className={classes.header}>
        <h3 className={classes.subtitle}>My Events</h3>

        <div
          onClick={createEventModalHandler}
          className={classes.createEventButton}
        >
          <img src={speakerPic} className={classes.pic} />
          <div>
            <h4 style={{ margin: 0 }}>jio your friends!</h4>
            <p style={{ margin: 0 }}>Click here to create an event!</p>
          </div>
        </div>
      </div>

      <div className={classes.content}>
        <div className={classes.leftContainer}>
          <p className={classes.columnTitle}>Upcoming Events</p>
          {DUMMYDATA.map((event, index) => (
            <Event
              key={index}
              title={event.eventTitle}
              location={event.location}
              dateTime={event.dateTime}
              participants={event.participants}
            />
          ))}
        </div>
        <div className={classes.rightContainer}>
          <p className={classes.columnTitle}>Previous Events</p>
        </div>
      </div>
      {createEventModal && (
        <CreateEventModal toggle={createEventModalHandler} />
      )}
    </div>
  );
}
