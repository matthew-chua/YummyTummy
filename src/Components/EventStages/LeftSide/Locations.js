import { useState, useEffect } from "react";
import Stars from "../../Utility/Stars";

//css
import classes from "./Locations.module.css";

export default function Locations(props) {
  const [location, setLocation] = useState([]);
  useEffect(() => {
    if (props.locations){
      setLocation(props.locations);
    }
  }, [props.locations]);

  return (
    <div>
      <h1 className={classes.title}>Our Recommendations</h1>
      {location.map((location, index) => (
        <div className={classes.locationCard}>
          <div>
            <p className={classes.text}>{location.name}</p>
            {/* <p className={classes.text}>{parseFloat(location.rating)}</p> */}
            <Stars rating={location.rating} />
          </div>
          <i className={"fa fa-chevron-right"}></i>
        </div>
      ))}
    </div>
  );
}
