import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../Auth/AuthProvider";

//components
import Card from "../Components/Card";
import LeftSide from "../Components/EventStages/LeftSide/LeftSide";
import JoinYourFriends from "../Components/EventStages/RightSide/JoinYourFriends";
import HostSearch from "../Components/EventStages/RightSide/HostSearch";
import WaitForLocation from "../Components/EventStages/RightSide/WaitForLocation";
import CuratedLocation from "../Components/EventStages/RightSide/CuratedLocation";

//css
import classes from "./EventPage.module.css";

//data manager
import { getSingleEvent } from "../Firestore/DatabaseManager";
import HostChooseLocation from "../Components/EventStages/RightSide/HostChooseLocation";
import ChooseLocationCard from "../Components/EventStages/ChooseLocation/ChooseLocationCard";

export default function EventPage() {
  // 0 - host (search location)
  // 1 - host (choose location)
  // 2 - host / participant (curated location)
  // 3 - invitee (join event)
  // 4 - participant (wait for host to choose location)
  // 5 - loading screen so it won't make unnecessary api calls
  console.log("help la");

  const PageStates = {
    SearchLocation: 0,
    ChooseLocation: 1,
    SelectedLocation: 2,
    JoinEvent: 3,
    JoinedEvent: 4,
    Loading: 5,
  };

  // initial state = loading
  const [pageState, setPageState] = useState(PageStates.Loading);
  const params = useParams();

  //get current userID
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [eventState, setEventState] = useState(null);
  useEffect(async () => {
    //get event, then set the pageState based on the event
    setLoading(true);
    const singleEvent = await getSingleEvent(params.id);
    if (eventState == null) {
      // stop an unlimited loop because i added event state to dependency
      setEventState(singleEvent);
    }
    setLoading(false);
    pageSetter(singleEvent);
  }, [eventState]);

  //this function sets the pageState
  const pageSetter = (event) => {
    if (event.host.id == currentUser.uid) {
      //user is host of the event, pageState should be 0/1/2
      if (event.recommendedEateries.length === 0) {
        setPageState(PageStates.SearchLocation);
      } else if (event.selectedEatery === "") {
        setPageState(PageStates.ChooseLocation);
      } else {
        setPageState(PageStates.SelectedLocation);
      }
    } else if (!event.participantsID.includes(currentUser.id)) {
      setPageState(PageStates.JoinEvent);
    } else {
      setPageState(PageStates.JoinedEvent);
    }
  };

  return (
    <div className={classes.root}>
      {pageState === PageStates.SearchLocation && (
        <Card
          left={
            <LeftSide
              pageState={pageState}
              id={params.id}
              event={eventState}
              loading={loading}
            />
          }
          right={
            <HostSearch
              location={eventState.totalCoordinates}
              participantsList={eventState.participantsID}
              eventID={eventState.eventID}
              setEventState={setEventState}
            />
          }
          pageState={pageState}
        />
      )}

      {pageState === PageStates.ChooseLocation && (
        <ChooseLocationCard
          pageState={pageState}
          id={params.id}
          event={eventState}
          loading={loading}
        />
      )}

      {pageState === PageStates.SelectedLocation && (
        <Card
          left={
            <LeftSide
              pageState={pageState}
              event={eventState}
              id={params.id}
              loading={loading}
            />
          }
          right={<CuratedLocation />}
          pageState={pageState}
        />
      )}

      {pageState === PageStates.JoinEvent && (
        <Card
          left={
            <LeftSide
              pageState={pageState}
              id={params.id}
              event={eventState}
              loading={loading}
            />
          }
          right={<JoinYourFriends />}
          pageState={pageState}
        />
      )}

      {pageState === PageStates.JoinedEvent && (
        <Card
          left={
            <LeftSide
              pageState={pageState}
              id={params.id}
              event={eventState}
              loading={loading}
            />
          }
          right={<WaitForLocation />}
          pageState={pageState}
        />
      )}
      {pageState === PageStates.Loading && <h1>loading boi</h1>}
    </div>
  );
}
