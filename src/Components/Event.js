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
  const split = props.dateTime.split("T")
  const time = split[1].substring(0,5)
  const date = split[0];
  

  return (
    <div className={classes.root} onClick={openEventPageHandler}>
      <div className={classes.leftContainer}>
        <h3 className={classes.eventTitle}>{props.title}</h3>
        <div>
          <p className={classes.fontsize}>📍 {props.location ? props.location : "Pending"}</p>
          <p className={classes.fontsize}>⏰ {time + " - " + date}</p>
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
  );
}
