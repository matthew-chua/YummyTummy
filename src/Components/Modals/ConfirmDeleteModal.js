import React from "react";
import { useState } from "react";
import classes from "./ConfirmDeleteModal.module.css";
import { deleteEvent } from "../../Firestore/DatabaseManager";
import { useHistory } from "react-router";
import LoadingModal from "./LoadingModal";

export default function ConfirmDeleteModal(props) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const deleteEventHandler = async () => {
    console.log(props.event);
    if (props.event) {
      setLoading(true);
      setHidden();
      await deleteEvent(props.event);
      console.log("I SHOULD BE HERE");
      history.push("/home");
      // window.location.reload();
    }
  };

  const setHidden = () => {
    console.log(document.body.style.overflow);
    if (document.body.style.overflow !== "hidden") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  };

  return (
    <div>
      <div className={classes.root}>
        <h1 className={classes.bigFont}>
          Are you sure you want to delete this event?
        </h1>
        <h3 className={classes.smallFont}>This cannot be undone</h3>
        <div className={classes.buttons}>
          <button className={classes.leftButton} onClick={props.toggle}>
            Cancel
          </button>
          <button className={classes.rightButton} onClick={deleteEventHandler}>
            Delete
          </button>
        </div>
      </div>
      <div className={classes.overlay} onClick={props.toggle} />
      <LoadingModal isLoading={loading} />
    </div>
  );
}
