import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../Auth/AuthProvider";
import { useHistory } from "react-router";

//components
import Card from "../Components/Card";
import LeftSide from "../Components/EventStages/LeftSide/LeftSide";
import JoinYourFriends from "../Components/EventStages/RightSide/JoinYourFriends";
import HostSearch from "../Components/EventStages/RightSide/HostSearch";
import WaitForLocation from "../Components/EventStages/RightSide/WaitForLocation";
import CuratedLocation from "../Components/EventStages/RightSide/CuratedLocation";
import LoadingModal from "../Components/Modals/LoadingModal";

//css
import classes from "./EventPage.module.css";

//data manager
import { getSingleEvent,listenToEvent } from "../Firestore/DatabaseManager";
import HostChooseLocation from "../Components/EventStages/RightSide/HostChooseLocation";
import ChooseLocationCard from "../Components/EventStages/ChooseLocation/ChooseLocationCard";


export default function EventPage() {
  // 0 - host (search location)
  // 1 - host (choose location)
  // 2 - host / participant (curated location)
  // 3 - invitee (join event)
  // 4 - participant (wait for host to choose location)
  // 5 - loading screen so it won't make unnecessary api calls
  

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

  // check if user is authenticated
  const [authed, setAuthed] = useState(true);

  //get current userID
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [eventState, setEventState] = useState(null);
  const history = useHistory();

  // let currentTime = new Date();
  // if (event.startTime.toDate() > currentTime) {
  //   myEvents.push(event);
  // } else {
  //   myExpiredEvents.push(event);
  // }

  useEffect(async () => {
    //get event, then set the pageState based on the event
    setLoading(true);
    const singleEvent = await getSingleEvent(params.id);
    if (singleEvent == null){
      history.push("/home");
    }
    if (eventState == null) {
      // stop an unlimited loop because i added event state to dependency
      setEventState(singleEvent);
    }
    
    let currentTime = new Date();
    if (eventState){
      if (eventState.startTime.toDate() < currentTime){
        console.log("expired");
        history.push("/expired");
      }
    }

    setLoading(false);
    pageSetter(singleEvent);
  }, [eventState]);

  // useEffect(()=>{
  //   if (eventState){
  //     listenToEvent(eventState.eventID, setEventState)
  //   }
  // },[])
    

  //this function sets the pageState
  const pageSetter = (event) => {
    // not logged in state passed as prop to JoinYourFriends
    // console.log("HERE", event);
    if (!currentUser) {
      setAuthed(false);
      setPageState(PageStates.JoinEvent);
      console.log("run now");
    } else {
      let participantIDArray = [];
      event.participantsID.forEach((participant) => {
        participantIDArray.push(participant.id);
      })
      
      try{


        if (event.host.id == currentUser.uid) {
          //user is host of the event, pageState should be 0/1/2
          if (event.recommendedEateries.length === 0) {
            setPageState(PageStates.SearchLocation);
          } else if (event.selectedEatery === "") {
            setPageState(PageStates.ChooseLocation);
          } else {
            setPageState(PageStates.SelectedLocation);
          }
        } else if (!participantIDArray.includes(currentUser.uid)) {
          setPageState(PageStates.JoinEvent);
        } else if (event.selectedEatery !== ""){
          setPageState(PageStates.SelectedLocation);
        }else {
          setPageState(PageStates.JoinedEvent);
        }
      } catch (err){
        history.push("/expired");
      }
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
              setEventState={setEventState}
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
          setEventState={setEventState}
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
              setEventState={setEventState}
            />
          }
          right={<CuratedLocation event={eventState}/>}
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
              setEventState={setEventState}
            />
          }
          right={<JoinYourFriends authed={authed} setAuthed={setAuthed} event={eventState} setEventState={setEventState}/>}
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
              setEventState={setEventState}
            />
          }
          right={<WaitForLocation eventID={eventState.eventID} setEventState={setEventState}/>}
          pageState={pageState}
        />
      )}
      {/* {pageState === PageStates.Loading && <h1>loading boi</h1>} */}
      <LoadingModal isLoading = { pageState === PageStates.Loading }/> 
    </div>
  );
}

