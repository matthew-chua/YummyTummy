import React from "react";
import { useState } from "react";
import classes from "./Card.module.css";

export default function Card(props) {
  const [editModal, setEditModal] = useState(false);

  const editModalHandler = () => {
    setEditModal((prev) => !prev);
  };
  return (
    <div className={classes.card}>
      <div className={classes.leftContainer}>
      <div className={classes.paddingDiv}>

          {props.left}
          </div>
        {/* <h1>Event Title</h1> */}
        {/* <button onClick={editModalHandler}>EDIT EVENT</button> */}
      </div>
      <div className={classes.rightContainer}>
          <div className={classes.paddingDiv}>
      {props.right}
      </div>
          
        {/* <h3>Choose Location</h3> */}
        {/* <p>When all friends have responded, hit the search button!</p> */}
        {/* <p>
          We'll suggest a handful of optimal diners for you to choose based on
          their locaitom, reviews and what's still open at this time!
        </p>
        <button>Search</button> */}
      </div>
      {/* {editModal && <EditEventModal toggle={editModalHandler} />} */}
    </div>
  );
}
