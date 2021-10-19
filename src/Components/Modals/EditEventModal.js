import React from "react";
import classes from "./EditEventModal.module.css";
import { useState, useEffect } from "react";

import pic from "../../Assets/eventpic.svg";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import Card from "../Card";
import { editEvent } from "../../Firestore/DatabaseManager";
import { Timestamp } from "firebase/firestore";

import LoadingModal from "./LoadingModal";

export default function EditEventModal(props) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(props.event.maxParticipants);

  const toggleDeleteModal = (e) => {
    e.preventDefault();
    setShowDeleteModal((prev) => !prev);
  };

  const plusOne = (e) => {
    e.preventDefault();
    if (count < 5) {
      setCount(() => count + 1);
    }
  };

  const minusOne = (e) => {
    e.preventDefault();
    if (count > 1) {
      setCount(() => count - 1);
    }
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

  console.log("HERE", props.event);
  // console.log("title", eventState.eventTitle);

  const [eventTitleValid, setEventTitleValid] = useState(true);

  const [startTimeValid, setStartTimeValid] = useState(true);

  const submitHandler = async (e) => {
    console.log("Hi", eventState);
    e.preventDefault();
    eventState.maxParticipants = count;
    if (eventState.eventTitle == "" && !eventState.startTime) {
      setStartTimeValid(false);
      setEventTitleValid(false);
    } else if (!eventState.startTime) {
      setStartTimeValid(false);
      setEventTitleValid(true);
    } else if (eventState.eventTitle == "") {
      setEventTitleValid(false);
      setStartTimeValid(true);
    } else {
      setEventTitleValid(true);
      setStartTimeValid(true);

      let finalEvent = { ...eventState, startTime: time };

      console.log("FINAL EVENT", eventState.startTime);
      console.log("FINAL pax", eventState.maxParticipants);
      if (!finalEvent.startTime){
        finalEvent.startTime = props.event.startTime;
      }
      // add state here
      setLoading(true);

      await editEvent(finalEvent);
      // need to check for failure bro
      window.location.reload();
    }
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

  const [time, setTime] = useState();

  const editDate = (e) => {
    let timeStamp = new Timestamp(Date.parse(e.target.value) / 1000, 0);
    setTime(timeStamp);
    console.log("here1", timeStamp);
    setEventState({
      ...eventState,
      startTime: e.target.value,
    });
    console.log("here2", eventState.startTime);
  };

  return (
    <>
      {showDeleteModal && (
        <ConfirmDeleteModal event={eventState} toggle={toggleDeleteModal} />
      )}

      <form className={classes.modal}>
        <Card
          left={
            <div className={classes.leftContainer}>
              <h2>Event Title:</h2>
              <input value={eventState.eventTitle} onChange={editTitle} />
              {!eventTitleValid && (
                <p className={classes.invalidText}>This is a required field.</p>
              )}
              <h2>Date & Time:</h2>
              <input
                type="datetime-local"
                value={eventState.startTime}
                onChange={editDate}
              />
              {!startTimeValid && (
                <p className={classes.invalidText}>
                  Date and Time is Required.
                </p>
              )}

              {/* <h2>Max Pax:</h2>
              <input
                type="number"
                value={eventState.maxParticipants}
                onChange={editMaxPax}
              /> */}

              <div className={classes.maxPax}>
                <h2 className={classes.maxPaxText}>Max Pax:</h2>
                <button className={classes.minusButton} onClick={minusOne}>
                  -
                </button>

                <p
                  className={classes.count}
                  type="number"
                  onChange={editMaxPax}
                >
                  {count}
                </p>
                <button className={classes.addButton} onClick={plusOne}>
                  +
                </button>
              </div>

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
      <LoadingModal isLoading={loading} />
      {/* {loading && <h1>loading boi</h1>} */}
    </>
  );
}
