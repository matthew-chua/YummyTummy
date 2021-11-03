import React from "react";
import { useState, useEffect, useContext } from "react";
import { getEvents } from "../Firestore/DatabaseManager";
import { AuthContext } from "../Auth/AuthProvider";
// import LoadingModal from "../Components/Modals/LoadingModal";
import LoadingGif from "../Assets/LoadingGif.svg"

//css
import classes from "./Page.module.css";

//assets
import speakerPic from "../Assets/announcement.png";

//components
import CreateEventModal from "../Components/Modals/CreateEventModal";
import Event from "../Components/Event";

export default function HomePage() {
  const { currentUser } = useContext(AuthContext);
  const [createEventModal, setCreateEventModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const createEventModalHandler = () => {
    setCreateEventModal((prev) => !prev);
    setHidden();
  };

  //fetches ALL events from firebase
  const [eventState, setEventState] = useState([]);
  useEffect(async () => {
    setHidden();
    setLoading(true);
    const eventArray = await getEvents();
    setEventState(eventArray);
    setLoading(false);
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

  //checks for empty lists
  let noExpiredEvents = false;
  let noUpcomingEvents = false;

  if (myExpiredEvents.length === 0) {
    noExpiredEvents = true;
  }

  if (myEvents.length === 0) {
    noUpcomingEvents = true;
  }

  // prevent scrolling when CREATE event modal is open

  const setHidden = () => {
    console.log(document.body.style.overflow);
    if (document.body.style.overflow !== "hidden") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  };

  return (
    <div className={classes.page}>
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
              location={event.selectedEateryName}
              dateTime={event.startTime.toDate()}
              participants={event.participantsID}
              eventID={event.eventID}
              expired={false}
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
              location={event.selectedEateryName}
              dateTime={event.startTime.toDate()}
              participants={event.participantsID}
              eventID={event.eventID}
              expired={true}
            />
          ))}
        </div>
      </div>
      {createEventModal && (
        <CreateEventModal toggle={createEventModalHandler} />
      )}
      {/* <LoadingModal isLoading={loading} /> */}
      { loading && 
        <div className={classes.pic1}>
          <img className={classes.spinner} src={LoadingGif}/>
          <div className={classes.overlay} />
        </div>
      }
    </div>
  );
}
