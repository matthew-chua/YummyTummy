import React, { useState } from "react";
import { useHistory } from "react-router";

//css
import classes from "./Event.module.css";

export default function Event(props) {
  const participants = props.participants;

  const history = useHistory();

  const openEventPageHandler = () => {
    history.push(`/event/${props.eventID}`);
  };

  //format the time more nicely
  const formattedTime = props.dateTime.toString().split(" ");
  const date = formattedTime[1] + " " + formattedTime[2];
  const time = formattedTime[4].substring(0, 5);

  return (
    <div className={classes.root} onClick={openEventPageHandler}>
      <div className={classes.cardContent}>
        <div className={classes.leftContainer}>
          <h3 className={classes.eventTitle}>{props.title}</h3>
          <div>
            <p className={classes.fontsize}>
              📍 {props.location ? props.location : "Pending"}
            </p>
            <p className={classes.fontsize}>⏰ {date + ", " + time}</p>
          </div>
        </div>
        <div className={classes.rightContainer}>
          {/* actually if too many, put ... */}
          {participants.map((participant, index) => (
            <p key={index} className={classes.fontsize}>
              {participant.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
