import { useEffect } from "react";

import Slider from "react-slick";
import classes from "./HostChooseLocation.module.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Stars from "../../Utility/Stars";

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

  return (
    <div>
      {props.selectedPlace ? (
        // <img
        //   src={
        //     props.selectedPlace.photoURLList &&
        //     props.selectedPlace.photoURLList[2].getUrl({
        //       maxWidth: 500,
        //       maxHeight: 500,
        //     })
        //   }
        // />
        <>
          <Slider {...settings}>
            {props.selectedPlace.photoURLList &&
              props.selectedPlace.photoURLList.map((img, index) => (
                <div key={index} className={classes.carouselContainer}>
                  <img
                    className={classes.carouselImg}
                    src={img.getUrl(options)}
                    alt=""
                  ></img>
                </div>
              ))}
          </Slider>
          <h3>{props.selectedPlace.name}</h3>
          <p>{props.selectedPlace.address}</p>
          <Stars rating={props.selectedPlace.rating}/>
          <p>{`${props.selectedPlace.reviews} reviews`}</p>
          <button className={classes.btn}> Select </button>
        </>
      ) : (
        <h1>"pick a place"</h1>
      )}
    </div>
  );
}
