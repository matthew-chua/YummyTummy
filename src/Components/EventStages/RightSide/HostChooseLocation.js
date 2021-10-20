import { useEffect } from "react";

import Slider from "react-slick";
import classes from "./HostChooseLocation.module.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Stars from "../../Utility/Stars";

import svg from "../../../Assets/undraw_special_event_4aj8.svg";
import { selectLocation } from "../../../Firestore/DatabaseManager";

export default function HostChooseLocation(props) {
  useEffect(() => {
    if (props.selectedPlace) {
      //   setSelectedPlace(props.selectedPlace)
      if (props.selectedPlace.photoURLList) {
        console.log(
          props.selectedPlace.photoURLList[0].getUrl({
            maxWidth: 35,
            maxHeight: 35,
          })
        );
      }
    }
  }, [props.selectedPlace]);
  // const [photoURLList, setPhotoURLList] = useState([])

  let settings = {
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    focusOnSelect: false,
    // responsive: [
    //   {
    //     breakpoint: 768,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 1,
    //       infinite: true,
    //       dots: true,
    //     },
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //     },
    //   },
    // ],
  };
  let options = {
    // maxWidth: 500,
    maxHeight: 500,
  };

  const selectLocationHandler = async () => {
    // bitch i aint doing none of this shit no more bye!
    console.log(props.event, props.selectedPlace.placeId)
    await selectLocation(props.event, props.selectedPlace.placeId)
    window.location.reload();
  };

  return (
    <div>
      {props.selectedPlace ? (
        <>
          {props.selectedPlace.photoURLList ? (
            <Slider {...settings}>
              {props.selectedPlace.photoURLList.map((img, index) => (
                <div key={index} className={classes.carouselContainer}>
                  <img
                    className={classes.carouselImg}
                    src={img.getUrl(options)}
                    alt="restaurant"
                  ></img>
                </div>
              ))}
            </Slider>
          ) : (
            <div className={classes.carouselContainer}>
              <img className={classes.carouselImg} src={svg} />
            </div>
          )}
          <h3 className={classes.title}>{props.selectedPlace.name}</h3>
          <p>{props.selectedPlace.address}</p>
          <Stars rating={props.selectedPlace.rating} />
          <p>{`${props.selectedPlace.reviews} reviews`}</p>
          <button className={classes.btn} onClick={selectLocationHandler}>
            {" "}
            Select{" "}
          </button>
        </>
      ) : (
        <h1 className={classes.text1}>loading </h1>
      )}
    </div>
  );
}
