import React from "react";
import { useState, useEffect } from "react";
import pic from "../../../Assets/location_by_Icons8.gif";
import {
  useNearbySearch,
  getNearbyRestaurants,
} from "../../../Maps/UseNearbySearch";
import { doc, onSnapshot } from "firebase/firestore";
// import LoadingModal from "../../Modals/LoadingModal";

//css
import classes from "./HostSearch.module.css";

//network
import { listenToEvent, updateRecommendedEateries } from "../../../Firestore/DatabaseManager";

export default function HostSearch(props) {
  const currentEvent = props.event;
  const [showEateries, setShowEateries] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [radius, setRadius] = useState(500);

  useNearbySearch();

  // listener = useEventListener(props.eventID, props.setEventState);
  // useEffect(() => {
  //   if (props.eventID){
  //     listenToEvent(props.eventID, props.setEventState)
  //   }
  // }, [props.eventID])

  // useEffect(()=>{
  //   if (currentEvent){
  //     listenToEvent(currentEvent.eventID, props.setEventState)
  //   }
  // },[currentEvent])

  const didFinishGettingNearbyRestaurants = async (recommendedEateries) => {
    if (!recommendedEateries) {
      setLoading(false);
      setError(true);
      setRadius((prev) => prev * 6);
      return;
    }

    console.log("hello");
    const didUpload = await updateRecommendedEateries(
      props.eventID,
      recommendedEateries
    );

    if (didUpload) {
      window.location.reload();
    }
    // need to check for success
    // reload
    props.setEventState((prev) => {
      return { ...prev, recommendedEateries: recommendedEateries };
    });
  };

  const toggleShowEateries = () => {
    setShowEateries((prev) => !prev);
    if (props.location) {
      console.log(props.location);
      console.log(props.participantsList.length);
      // console.log("updated lat: ", (props.location[0] / props.participantsList.length).toFixed(7));
      // console.log("updated lng: ", (props.location[1] / props.participantsList.length).toFixed(7));
      // console.log(props.location / props.participantsList.length)
      setError(false);
      setLoading(true);

      getNearbyRestaurants(
        {
          lat: parseFloat(
            (props.location[0] / props.participantsList.length).toFixed(7)
          ),
          lng: parseFloat(
            (props.location[1] / props.participantsList.length).toFixed(7)
          ),
        },
        didFinishGettingNearbyRestaurants,
        radius
      );
    } else {
      // handle error
    }
  };

  return (
    <div className={classes.root}>
      <img src={pic} className={classes.img} />
      <div id="map"></div>
      <div className={classes.text}>
        <h1 className={classes.title}>Search</h1>
        <p className={`${classes.description}`}>
          When all friends have responded, hit the search button!
        </p>
        <p className={classes.description}>
          We’ll suggest a handful of optimal diners for you to choose based on
          their location, reviews and what’s still open at this time!
        </p>
        <button
          className={`${error && classes.error} ${classes.btn}`}
          onClick={toggleShowEateries}
        >
          Search
        </button>
        {loading && <p className={classes.text1}>Loading </p>}
        {error && <p>Oops, no restaurants found. Please try again!</p>}
        {/* <LoadingModal isLoading = {loading} /> */}
      </div>
    </div>
  );
}
