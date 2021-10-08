import { useEffect, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import "./AutocompleteSearch.css";

export default function AutocompleteSearch(props) {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(false);


  const searchBoxChangeHandler = () => {
    if (error) {
      setError(false);
    }
  };

  const searchBoxActionClicked = () => {
    // if (location)
    if (location == null) {
      // shake text box
      setError(true);
      // props.searchBoxActionClicked(null);
    } else {
      props.searchBoxActionClicked(location);
    }
  };

  function initMap() {
    let map;
    map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });

    

    // const card = document.getElementById("pac-card");
    const input = document.getElementById("pac-input");
    // const biasInputElement = document.getElementById("use-location-bias");
    // const strictBoundsInputElement =
    //   document.getElementById("use-strict-bounds");
    const options = {
      fields: ["formatted_address", "geometry", "name"],
      strictBounds: false,
      types: ["geocode", "establishment"],
    };

    // map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(card);

    const autocomplete = new window.google.maps.places.Autocomplete(
      input,
      options
    );

    var service = new window.google.maps.places.PlacesService(map);

    // autocomplete.bindTo("bounds", map);

    // const infowindow = new window.google.maps.InfoWindow();
    // const infowindowContent = document.getElementById("infowindow-content");

    // infowindow.setContent(infowindowContent);

    // const marker = new window.google.maps.Marker({
    //   map,
    //   anchorPoint: new window.google.maps.Point(0, -29),
    // });

    autocomplete.addListener("place_changed", () => {
      //   infowindow.close();
      //   marker.setVisible(false);

      const place = autocomplete.getPlace();
      // service.getDetails(place)
      if (!place.geometry || !place.geometry.location) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        

        return;
      }

      console.log("place:", place.geometry.location.toJSON());
      setLocation(place.geometry.location.toJSON());
      // If the place has a geometry, then present it on a map.
      //   if (place.geometry.viewport) {
      //     map.fitBounds(place.geometry.viewport);
      //   } else {
      //     map.setCenter(place.geometry.location);
      //     map.setZoom(17);
      //   }

      //   marker.setPosition(place.geometry.location);
      //   marker.setVisible(true);
      //   infowindowContent.children["place-name"].textContent = place.name;
      //   infowindowContent.children["place-address"].textContent =
      // place.formatted_address;
      //   infowindow.open(map, marker);
    });

    // Sets a listener on a radio button to change the filter type on Places
    // Autocomplete.
    // function setupClickListener(id, types) {
    //   const radioButton = document.getElementById(id);

    //   radioButton.addEventListener("click", () => {
    //     autocomplete.setTypes(types);
    //     input.value = "";
    //   });
    // }

    // setupClickListener("changetype-all", []);
    // setupClickListener("changetype-address", ["address"]);
    // setupClickListener("changetype-establishment", ["establishment"]);
    // setupClickListener("changetype-geocode", ["geocode"]);
    // setupClickListener("changetype-cities", ["(cities)"]);
    // setupClickListener("changetype-regions", ["(regions)"]);
    // biasInputElement.addEventListener("change", () => {
    //   if (biasInputElement.checked) {
    //     autocomplete.bindTo("bounds", map);
    //   } else {
    //     // User wants to turn off location bias, so three things need to happen:
    //     // 1. Unbind from map
    //     // 2. Reset the bounds to whole world
    //     // 3. Uncheck the strict bounds checkbox UI (which also disables strict bounds)
    //     autocomplete.unbind("bounds");
    //     autocomplete.setBounds({
    //       east: 180,
    //       west: -180,
    //       north: 90,
    //       south: -90,
    //     });
    //     strictBoundsInputElement.checked = biasInputElement.checked;
    //   }

    //   input.value = "";
    // });
    // strictBoundsInputElement.addEventListener("change", () => {
    //   autocomplete.setOptions({
    //     strictBounds: strictBoundsInputElement.checked,
    //   });
    //   if (strictBoundsInputElement.checked) {
    //     biasInputElement.checked = strictBoundsInputElement.checked;
    //     autocomplete.bindTo("bounds", map);
    //   }

    //   input.value = "";
    // });
  }
  useEffect(() => {
    initMap();
  }, []);

  return (
    <
      // style={{width:'40px'}}
    >
      {/* <div className="pac-card" id="pac-card">
        {/* <>
          <div id="title">Autocomplete search</div>
          {/* <div
            id="type-selector"
            //   className={classes.pacControls}
            className={"pacControls"}
          >
            <input
              type="radio"
              name="type"
              id="changetype-all"
              checked="checked"
            />
            <label for="changetype-all">All</label>

            <input type="radio" name="type" id="changetype-establishment" />
            <label for="changetype-establishment">establishment</label>

            <input type="radio" name="type" id="changetype-address" />
            <label for="changetype-address">address</label>

            <input type="radio" name="type" id="changetype-geocode" />
            <label for="changetype-geocode">geocode</label>

            <input type="radio" name="type" id="changetype-cities" />
            <label for="changetype-cities">(cities)</label>

            <input type="radio" name="type" id="changetype-regions" />
            <label for="changetype-regions">(regions)</label>
          </div>
          <br />
          <div
            id="strict-bounds-selector"
            //   className={classes.pacControls}
            className={"pacControls"}
          >
            <input type="checkbox" id="use-location-bias" value="" checked />
            <label for="use-location-bias">Bias to map viewport</label>

            <input type="checkbox" id="use-strict-bounds" value="" />
            <label for="use-strict-bounds">Strict bounds</label>
          </div>
        </div>
        <div id="pac-container">
          <input id="pac-input" type="text" placeholder="Enter a location" />
        </div>
      </div> */}
      <div id="autocompleteflex">
        <input className={error ? "textBoxError" : ""} id="pac-input" type="text" placeholder={props.placeholder} onChange={searchBoxChangeHandler} />
        <button id="clear" type="button" onClick={searchBoxActionClicked}>
          {props.buttonText}
        </button>
      </div>
      {error && <p style={{color: props.errorTextColor}}>Error, please select from given options</p>}
      <div id="map"></div>
      {/* <div id="infowindow-content">
        <span id="place-name" className="title"></span>
        <br />
        <span id="place-address"></span>
      </div> */}
    </>
  );
}
