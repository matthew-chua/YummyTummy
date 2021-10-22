import {useEffect} from "react";
import WaitForLocationGif from "../../../Assets/WaitForLocation.gif";
import classes from "./WaitForLocation.module.css";
import { listenToEvent } from "../../../Firestore/DatabaseManager";

export default function WaitForLocation(props) {

  useEffect(()=>{
    if (props.eventID){
      listenToEvent(props.eventID, props.setEventState)
    }
  },[props.eventID])

  return (
    <div className={classes.root}>
      <div>
        <img src={WaitForLocationGif} className={classes.pic} alt="WaitingGif" />
      </div>
      <div>
        <h3 className={classes.join}>The host has not chosen a location yet</h3>
        <h3 className={classes.text1}>Patience, young one </h3>
      </div>
    </div>
  );
}
