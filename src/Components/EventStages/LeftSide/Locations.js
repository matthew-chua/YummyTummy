import { useState, useEffect } from "react";
import Stars from "../../Utility/Stars";

//css
import classes from "./Locations.module.css";

export default function Locations(props) {
  const placeClickHandler = (event) => {
    props.placeClickHandler(event.target.id);
  };

  const [location, setLocation] = useState([]);
  useEffect(() => {
    if (props.locations) {
      setLocation(props.locations);
    }
  }, [props.locations]);

  return (
    <div>
      <h1 className={classes.title}>Our Recommendations</h1>
      {location.map((location, index) => (
        <div
          id={index}
          className={`${classes.locationCard} ${
            props.selectedIndex == index && classes.active
          }`}
          onClick={placeClickHandler}
        >
          <div id={index}>
            <p id={index} className={classes.text}>
              {location.name}
            </p>
            <Stars indexValue={index} rating={location.rating} />
          </div>
          <i id={index} className={"fa fa-chevron-right"}></i>
        </div>
      ))}
    </div>
  );
}
