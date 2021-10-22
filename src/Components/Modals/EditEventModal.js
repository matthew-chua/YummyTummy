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
  Date.prototype.toLocaleISOString = function () {
    return new Date(this.getTime() - this.getTimezoneOffset() * 1000 * 60)
      .toISOString()
      .replace("Z", "");
  };
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
      newDate = props.event.startTime.toDate().toLocaleISOString().substr(0, 19);
      setEventState({
        ...props.event,
        startTime: newDate,
      });
    }
  }, []);

  
  

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

      
      if (!finalEvent.startTime) {
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
    
    setEventState({
      ...eventState,
      startTime: e.target.value,
    });
    
  };
  const min = new Date();

  return (
    <>
      {showDeleteModal && (
        <ConfirmDeleteModal event={eventState} toggle={toggleDeleteModal} />
      )}

      <form className={classes.modal}>
        <Card
          left={
            <div className={classes.leftContainer}>
              <div>
                <h2>Event Title:</h2>
                <input value={eventState.eventTitle} onChange={editTitle} />
                {!eventTitleValid && (
                  <p className={classes.invalidText}>
                    This is a required field.
                  </p>
                )}
                <h2>Date & Time:</h2>
                <input
                  type="datetime-local"
                  value={eventState.startTime}
                  onChange={editDate}
                  min={min.toISOString().substring(0, 16)}
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
              </div>
              <div className={classes.buttonGroup}>
              <div className={classes.horiButtonGroup}>
                <button onClick={props.toggle} className={classes.btn}>
                  Cancel
                </button>
                <button className={classes.btn} onClick={submitHandler}>
                  Save
                </button>
              </div>
                <button className={classes.delBtn} onClick={toggleDeleteModal}>
                
                  Delete
                </button>
              </div>
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
