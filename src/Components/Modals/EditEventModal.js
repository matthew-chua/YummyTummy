import React from "react";
import classes from "./EditEventModal.module.css";
import { useState, useEffect } from "react";

import pic from "../../Assets/eventpic.svg";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import Card from "../Card";

export default function EditEventModal(props) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const toggleDeleteModal = (e) => {
    e.preventDefault();
    setShowDeleteModal((prev) => !prev);
  };

  const [eventState, setEventState] = useState({});

  useEffect(() => {
    setEventState(props.event);
  }, [props.event]);

  const [error, setError] = useState(false);

  console.log("HERE", props.event);
  // console.log("title", eventState.eventTitle);

  let newDate = "";
  if (eventState.startTime) {
    newDate = eventState.startTime.toDate().toISOString().substr(0, 19);
    console.log("NEW DATE", newDate);
  }
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      {showDeleteModal && <ConfirmDeleteModal toggle={toggleDeleteModal} deleteModal={setShowDeleteModal} event={eventState}/>}

      <form className={classes.modal}>
        <Card
          left={
            <div className={classes.leftContainer}>
              <h2>Event Title:</h2>
              <input value={eventState.eventTitle} />
              <h2>Date & Time:</h2>
              <input type="datetime-local" value={newDate} />

              <h2>Max Pax:</h2>
              <input type="number" value={eventState.maxParticipants} />

              <div className={classes.horiButtonGroup}>
                <button onClick={props.toggle} className={classes.cancelButton}>
                  Cancel
                </button>
                <button className={classes.saveButton} onClick={submitHandler}>
                  Save
                </button>
              </div>

              <button
                className={classes.deleteButton}
                onClick={toggleDeleteModal}
              >
                Delete
              </button>
            </div>
          }
          right={
            <div className={classes.rightContainer}>
              <img src={pic} className={classes.pic} />
              <div className={classes.text}>
                <h1>Edit Event!</h1>
                <p>
                  Change of plans? No worries, simply update the details on the
                  left and hit save!
                </p>
              </div>
            </div>
          }
        />
      </form>
      <div className={classes.overlay} onClick={props.toggle} />
    </>
  );
}
