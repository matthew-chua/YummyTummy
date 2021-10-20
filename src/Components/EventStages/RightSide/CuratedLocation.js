import React from "react";
import { useState, useEffect } from "react";
import pic from "../../../Assets/location_by_Icons8.gif";
import Stars from "../../Utility/Stars";
import { getPlaceDetailsForList, usePlaceDetails } from "../../../Maps/UsePlaceDetails";
import classes from "./CuratedLocation.module.css";

export default function CuratedLocation(props) {
  usePlaceDetails();

  const [ratings, setRatings] = useState(2.0);
  const [placeDetails, setPlaceDetails] = useState({
    name: "",
    place_id: "",
    rating: "",
    user_ratings_total: "",
    opening_hours: "",
    formatted_address: "",
    address_component: "",
    } 
  )

  const didFetchPlaceDetail = (placeDetailsList) => {
    if (!placeDetailsList) {
      //error
      console.log("no place details list")
    } else {
      console.log("Here")
      console.log(placeDetailsList)
      setPlaceDetails(placeDetailsList)
    }
  }

  useEffect(() => {
    if (props.event) {
      getPlaceDetailsForList([props.event.selectedEatery], didFetchPlaceDetail)
    }
  }, [])

  const [showCopiedMessage, setShowCopiedMessage] = useState(false);

    const copyLinkHandler = () => {
        navigator.clipboard.writeText(`${placeDetails.address}`)
        setShowCopiedMessage(true);
        setTimeout(()=>{setShowCopiedMessage(false)}, 1000);
    }

  // ratings must be out of 5.0, pass into stars
  // made it reusable because i need use for left side also cheers -ivan
  
  // actually u might not even need this state, can just take directly from props, but see how you wanna do it
  return (
    <div className={classes.root}>
      <img src={pic} className={classes.img} />

      <div className={classes.text}>
        <h4 className={classes.title}>{placeDetails && placeDetails.name}</h4>
        <p className={classes.address}>
          {placeDetails && placeDetails.address}
        </p>
        <Stars rating={placeDetails && placeDetails.rating} />
        <p className={classes.ratingsText}>{placeDetails && placeDetails.reviews} Reviews</p>
      </div>
      
      

      <div className={classes.btnGroup}>
        <a className={classes.btn2} href={`https://www.google.com/maps/place/?q=place_id:${placeDetails.placeId}`}target="_blank">Open in Google Maps</a>
        <button className={classes.btn} onClick={copyLinkHandler}>Copy Address</button>
        {showCopiedMessage && <p className={classes.text}>Copied!</p>}
      </div>
    </div>
  );
}
