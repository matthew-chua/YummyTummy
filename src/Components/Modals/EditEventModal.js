import React from "react";
import classes from "./EditEventModal.module.css";
import { useState } from "react";

import pic from "../../Assets/eventpic.svg";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import Card from "../Card";

export default function EditEventModal(props) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const toggleDeleteModal = (e) => {
    e.preventDefault();
    setShowDeleteModal((prev) => !prev);
  };
  return (
    <>
      {showDeleteModal && <ConfirmDeleteModal toggle={toggleDeleteModal} />}

      <form className={classes.modal}>
        <Card
          left={
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
                <p>Change of plans? No worries, simply update the details on the left and hit save!</p>
              </div>
            </div>
          }
        />
      </form>
      <div className={classes.overlay} onClick={props.toggle} />
    </>
  );
}
