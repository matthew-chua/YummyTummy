import { useEffect, useState } from "react";
import Card from "../../Card";
import LeftSide from "../LeftSide/LeftSide";
import HostChooseLocation from "../RightSide/HostChooseLocation";

// google maps
import {
  getPlaceDetailsForList,
  usePlaceDetails,
} from "../../../Maps/UsePlaceDetails";

export default function ChooseLocationCard(props) {
  usePlaceDetails();

  // place list
  const [placeList, setPlaceList] = useState([]);

  // selected index from list of places
  const [selectedIndex, setSelectedIndex] = useState(0);

  const didFetchPlaceDetail = (place) => {
    // gets call each time successful fetch
    setPlaceList((prev) => {
      prev = [...prev, place];
      console.log("prev:", prev);
      return prev;
    });
  };

  const placeClickHandler = (index) => {
    setSelectedIndex(index);
  };

  useEffect(async () => {
    if (props.pageState === 1) {
      if (props.event) {
        // console.log("place details:");

        // here is the bug: calling api but updating with a callback function causes too many state rerenders
        // doesn't quite append properly thus inconsistent number of items displayed

        getPlaceDetailsForList(
          props.event.recommendedEateries,
          didFetchPlaceDetail
        );
      }
    }
  }, [props.event, props.pageState]);

  return (
    <Card
      left={
        <LeftSide
          pageState={props.pageState}
          id={props.id}
          event={props.event}
          loading={props.loading}
          placeList={placeList}
          placeClickHandler={placeClickHandler}
          selectedIndex={selectedIndex}
          setEventState={props.setEventState}
        />
      }
      right={<HostChooseLocation event={props.event} selectedPlace={placeList[selectedIndex]} placeList={placeList}/>}
      pageState={props.pageState}
    />
  );
}
