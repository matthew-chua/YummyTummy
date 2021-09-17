import React from "react";
import { useHistory } from "react-router";

//css
import classes from "./Event.module.css";



export default function Event(props) {
  const PARTICIPANTARRAY = props.participants;

  const history = useHistory();

  const openEventPageHandler = () => {
    history.push(`/event/${props.eventID}`);
  };

  return (
    <div className={classes.root} onClick={openEventPageHandler}>
      <div className={classes.leftContainer}>
        <h3 className={classes.eventTitle}>{props.title}</h3>
        <div>
          <p className={classes.fontsize}>📍 {props.location}</p>
          <p className={classes.fontsize}>⏰ {props.dateTime}</p>
        </div>
      </div>
      <div className={classes.rightContainer}>
        {/* actually if too many, put ... */}
        {PARTICIPANTARRAY.map((participant, index) => (
          <p key={index} className={classes.fontsize}>
            {participant}
          </p>
        ))}
      </div>
    </div>
  );
}
