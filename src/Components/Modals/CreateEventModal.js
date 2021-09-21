import React from "react";
import { useState } from "react";
import classes from "./CreateEventModal.module.css";
import pic from "../../Assets/eventpic.svg";
import Card from "../Card";

export default function CreateEventModal(props) {
  const [count, setCount] = useState(0);

  const plusOne = (e) => {
    e.preventDefault();
    if (count < 5) {
      setCount(count + 1);
    }
  };

  const minusOne = (e) => {
    e.preventDefault();
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div>
      <form className={classes.modal}>
        <Card
          left={
            <div className={classes.leftContainer}>
              <h2>Event Title:</h2>
              <input />
              <h2>Date & Time:</h2>
              <input type="datetime-local" />

              <div className={classes.maxPax}>
                <h2 className={classes.maxPaxText}>Max Pax:</h2>
                <button className={classes.minusButton} onClick={minusOne}>
                  -
                </button>
                <p className={classes.count}>{count}</p>
                <button className={classes.addButton} onClick={plusOne}>
                  +
                </button>
              </div>

              <div className={classes.vertButtonGroup}>
                <button
                  onClick={props.toggle}
                  className={classes.currentLocationButton}
                  type="button"
                >
                  Create with Current Location
                </button>
                {/* <div className={classes.or}>or</div> */}
                <button
                  onClick={props.toggle}
                  className={classes.joinWithPostalCode}
                  type="button"
                >
                  Create with Postal Code{" "}
                  <i
                    style={{ marginLeft: "10px" }}
                    class="fa fa-arrow-right"
                  ></i>
                </button>

                <button
                  onClick={props.toggle}
                  className={classes.cancelButton}
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </div>
          }
          right={
            <div className={classes.rightContainer}>
              <img src={pic} className={classes.pic} />

              <div className={classes.text}>
                <h3>Create an Event!</h3>
                <p>Fill in the details and hit create when you're done</p>
                <p>
                  Copy your event's unique URL and share it with your friends to
                  invite them!
                </p>
              </div>
            </div>
          }
        />
      </form>
      <div className={classes.overlay} onClick={props.toggle} />
    </div>
  );
}
