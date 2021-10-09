import { useState, useEffect } from "react";

var service;

export const useNearbySearch = () => {
  //   const [nearbyPlaces, setNearbyPlaces] = useState([]);
  // var service;

  useEffect(() => {
  var ntu = new window.google.maps.LatLng(1.3535969, 103.6876096);

  // var center = new window.google.maps.LatLng(location.lat, location.lng);
  let map = new window.google.maps.Map(document.getElementById("map"), {
    center: ntu,
    zoom: 15,
  });

  // const locationToSearch = new window.google.maps.LatLng(
  //   1.3535969,
  //   103.6876096
  // );
  // const locationToSearch = new window.google.maps.LatLng(
  //   location.lat,
  //   location.lng
  // );
  // var request = {
  //   location: locationToSearch,
  //   radius: "500",
  //   type: ["restaurant"],
  // };

  service = new window.google.maps.places.PlacesService(map);
  // service.nearbySearch(request, callback);
  }, []);

  // function callback(results, status) {
  //   if (status == window.google.maps.places.PlacesServiceStatus.OK) {
  //     for (var i = 0; i < results.length; i++) {
  //       // createMarker(results[i]);
  //       console.log(results[i]);
  //     }
  //   }
  // }

  // return service;
};

export const getNearbyRestaurants = (location, completed) => {
  const locationToSearch = new window.google.maps.LatLng(
    location.lat,
    location.lng
  );
  var request = {
    location: locationToSearch,
    radius: "500",
    type: ["restaurant"],
  };
  service.nearbySearch(request, callback);
  function callback(results, status) {
    if (status == window.google.maps.places.PlacesServiceStatus.OK) {
      let recommendedEateries = results.map((restaurant) => {
        return restaurant.place_id;
      });
      completed(recommendedEateries);
    }
  }
}

