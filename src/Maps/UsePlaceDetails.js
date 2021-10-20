import { query } from "@firebase/firestore";
import { useEffect } from "react";

let service;

export const usePlaceDetails = () => {
  useEffect(() => {
    let ntu = new window.google.maps.LatLng(1.3535969, 103.6876096);

    let map = new window.google.maps.Map(document.getElementById("map"), {
      center: ntu,
      zoom: 15,
    });
    service = new window.google.maps.places.PlacesService(map);
  }, []);
};

export const getPlaceDetailsForList = async (queryList, completed) => {
  console.log("querylist: ", queryList);
  //   const placeDetailList = [];

  for await (let placeID of queryList) {
    let request = {
      placeId: placeID,
      fields: [
        "name",
        "place_id",
        "rating",
        "user_ratings_total",
        "opening_hours",
        "formatted_address",
        "address_component",
        "photo"
      ],
    };

    const callback = (place, status) => {
      if (status == window.google.maps.places.PlacesServiceStatus.OK) {
        // let parse data first
        // placeDetailList.push(place);
        console.log("place: ", place)
        let cleanedPlace = {
          name: place.name,
          placeId: place.place_id,
          address: place.formatted_address,
          openingHours: place.opening_hours ? place.opening_hours.weekday_text[0] : "Closed on Sundays",
          rating: place.rating,
          reviews: place.user_ratings_total,
          photoURLList: place.photos
        };
        completed(cleanedPlace);
      }
    };
    service.getDetails(request, callback);
  }

  //   return placeDetailList;
};
