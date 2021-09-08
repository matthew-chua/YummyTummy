import React from "react";
import { useState } from "react";
import EditEventModal from "../Components/Modals/EditEventModal";

import classes from "./Page.module.css";

export default function EventPage() {
  const [editModal, setEditModal] = useState(false);

  const editModalHandler = () => {
    setEditModal(!editModal);
  };

  return (
    <div className={classes.page}>
      <div className={classes.card}>
        <div className={classes.leftContainer}>
          <h1>Event Title</h1>
          <button onClick={editModalHandler}>EDIT EVENT</button>
        </div>
        <div className={classes.rightContainer}>
          <h3>Choose Location</h3>
          <p>When all friends have responded, hit the search button!</p>
          <p>
            We'll suggest a handful of optimal diners for you to choose based on
            their locaitom, reviews and what's still open at this time!
          </p>
          <button>Search</button>
        </div>
        {editModal && <EditEventModal toggle={editModalHandler} />}
      </div>
    </div>
  );
}
