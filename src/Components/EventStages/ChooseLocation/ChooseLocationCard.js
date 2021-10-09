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
  const [selectedIndex, setSelectedIndex] = useState(null);

  const didFetchPlaceDetail = (place) => {
    // gets call each time successful fetch
    setPlaceList((prev) => {
      prev.push(place);
      return prev;
    });
  };

  const placeClickHandler = (index) => {
    setSelectedIndex(index);
  };

  useEffect(async () => {
    if (props.pageState === 1) {
      if (props.event) {
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
        />
      }
      right={<HostChooseLocation selectedPlace={placeList[selectedIndex]} />}
      pageState={props.pageState}
    />
  );
}
