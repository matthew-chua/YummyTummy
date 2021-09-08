import React from "react";
import { useState } from "react";
import { auth } from "../Auth/auth";
import CreateEventModal from "../Components/Modals/CreateEventModal";
import classes from "./Page.module.css";

//assets
import speakerPic from "../Assets/announcement.png";

export default function HomePage() {
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
      </div>
      <div className={classes.rightContainer}>
        
        <div onClick={createEventModalHandler} className={classes.createEventButton}>
            <img src={speakerPic} className={classes.pic}/>
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
