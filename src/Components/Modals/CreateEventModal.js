import React from "react";
import classes from "./CreateEventModal.module.css";
import pic from "../../Assets/eventpic.svg";


export default function CreateEventModal(props) {
  return (
    <div>
      <form className={classes.modal}>
        <div className={classes.leftContainer}>
          <h2>Event Title:</h2>
          <input />
          <h2>Date & Time:</h2>
          <input type="datetime-local" />

          <h2>Max Pax:</h2>
          <input type="number" />

          <div className={classes.horiButtonGroup}>
            <button onClick={props.toggle} className={classes.saveButton}>
              Cancel
            </button>
            <button className={classes.cancelButton} type="submit">
              Create
            </button>
          </div>

        </div>

        <div className={classes.rightContainer}>
        <img src={pic} className={classes.pic}/>

          <h1>Create Event!</h1>
          <p>
            Fill in the details and hit create when you're done!
            <br/>
            <br/>
            <br/>
            Copy your event's unique URL and share it with your friends to invite them!
          </p>
        </div>
      </form>
      <div className={classes.overlay} onClick={props.toggle} />
    </div>
  );
}
