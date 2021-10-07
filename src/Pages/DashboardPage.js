import React from "react";
import { useState, useEffect, useContext } from "react";
import { auth } from "../Auth/auth";
import classes from "./Page.module.css";
import { getEvents } from "../Firestore/DatabaseManager";
import { AuthContext } from "../Auth/AuthProvider";

//assets
import speakerPic from "../Assets/announcement.png";

//components
import CreateEventModal from "../Components/Modals/CreateEventModal";
import Event from "../Components/Event";

//firebase
import { Timestamp } from "firebase/firestore";

export default function HomePage() {
  const { currentUser } = useContext(AuthContext);
  

  const DUMMYDATA = [
    {
      eventTitle: "Supper",
      location: "Extension",
      dateTime: "22:00, 24/10/21",
      participants: ["Matthew (Host)", "Colin", "Grace"],
      eventID: "redfrog-93",
    },
    {
      eventTitle: "Lunch",
      location: "NorthHill",
      dateTime: "12:00, 28/10/21",
      participants: ["Matthew (Host)", "Colin", "Grace"],
      eventID: "bluefish-39",
    },
  ];

  const expiredEvents = [
    //   {
    //   eventTitle: "Lunch",
    //   location: "NorthHill",
    //   dateTime: "12:00, 28/10/21",
    //   participants: ["Matthew (Host)", "Colin", "Grace"],
    //   eventID: "bluefish-39"
    // }
  ];

  let noExpiredEvents = false;
  let noUpcomingEvents = false;

  if (expiredEvents.length === 0) {
    noExpiredEvents = true;
  }

  if (DUMMYDATA.length === 0) {
    noUpcomingEvents = true;
  }

  const [createEventModal, setCreateEventModal] = useState(false);

  const createEventModalHandler = () => {
    setCreateEventModal((prev) => !prev);
  };

  //fetches ALL events from firebase
  const [eventState, setEventState] = useState([]);
  useEffect(async () => {
    const eventArray = await getEvents();
    setEventState(eventArray);
  }, []);

  //add user's events to myEvents, and user's expired events to myExpiredEvents
  let myEvents = [];
  let myExpiredEvents = [];
  eventState.forEach((event) => {
    event.participantsID.forEach((participant) => {
      if (participant.id == currentUser.uid) {
        let currentTime = new Date();
        if (event.startTime.toDate() > currentTime) {
          myEvents.push(event);
        } else {
          myExpiredEvents.push(event);
        }
      }
    });
  });

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

          {noUpcomingEvents && (
            <p>
              You have no upcoming events 🥲 <br /> Use the button above to
              create an event!
            </p>
          )}

          {myEvents.map((event, index) => (
            <Event
              key={index}
              title={event.eventTitle}
              location={event.placeID}
              dateTime={event.startTime.toDate().toJSON()}
              participants={event.participantsID}
              eventID={event.eventID}
            />
          ))}
        </div>
        <div className={classes.rightContainer}>
          <p className={classes.columnTitle}>Previous Events</p>
          {noExpiredEvents && <p>You have no previous events 🥲</p>}

          {myExpiredEvents.map((event, index) => (
            <Event
              key={index}
              title={event.eventTitle}
              location={event.placeID}
              dateTime={event.startTime.toDate().toJSON()}
              participants={event.participantsID}
              eventID={event.eventID}
            />
          ))}
        </div>
      </div>
      {createEventModal && (
        <CreateEventModal toggle={createEventModalHandler} />
      )}
    </div>
  );
}
