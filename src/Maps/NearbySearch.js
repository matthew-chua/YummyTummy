import { useState, useEffect } from "react";
const useNearbySearch = () => {
  //   const [nearbyPlaces, setNearbyPlaces] = useState([]);

  useEffect(() => {
    var pyrmont = new window.google.maps.LatLng(-33.8665433, 151.1956316);

    let map = new window.google.maps.Map(document.getElementById("map"), {
      center: pyrmont,
      zoom: 15,
    });

    var request = {
      location: pyrmont,
      radius: "500",
      type: ["restaurant"],
    };

    var service = new window.google.maps.places.PlacesService(map);
    
    service.nearbySearch(request, callback);
}, []);
};

function callback(results, status) {
    if (status == window.google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        // createMarker(results[i]);
        console.log(results[i]);
      }
    }
  }

export default useNearbySearch;
