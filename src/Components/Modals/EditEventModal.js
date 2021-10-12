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

  let newDate = "";

  useEffect(() => {
    if (props.event) {
      // setEventState(props.event);
      newDate = props.event.startTime.toDate().toISOString().substr(0, 19);
      setEventState({
        ...props.event,
        startTime: newDate,
      });
      console.log("TEST", eventState.eventTitle);
    }
  }, []);

  const [error, setError] = useState(false);

  console.log("HERE", props.event);
  // console.log("title", eventState.eventTitle);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const editMaxPax = (e) => {
    setEventState({
      ...eventState,
      maxParticipants: e.target.value,
    });
  };

  const editTitle = (e) => {
    setEventState({
      ...eventState,
      eventTitle: e.target.value,
    });
  };

  const editDate = (e) => {
    setEventState({
      ...eventState,
      startTime: e.target.value,
    });
  };

  return (
    <>
      {showDeleteModal && <ConfirmDeleteModal toggle={toggleDeleteModal} />}

      <form className={classes.modal}>
        <Card
          left={
            <div className={classes.leftContainer}>
              <h2>Event Title:</h2>
              <input value={eventState.eventTitle} onChange={editTitle} />
              <h2>Date & Time:</h2>
              <input
                type="datetime-local"
                value={eventState.startTime}
                onChange={editDate}
              />

              <h2>Max Pax:</h2>
              <input
                type="number"
                value={eventState.maxParticipants}
                onChange={editMaxPax}
              />

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
