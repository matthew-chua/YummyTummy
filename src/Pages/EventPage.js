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

export default function EventPage() {
  const [pageState, setPageState] = useState(0);
  const params = useParams();

  //get current userID
  const { currentUser } = useContext(AuthContext);  
  const [loading, setLoading] = useState(false);
  const [eventState, setEventState] = useState({});
  useEffect(async()=>{
    //get event, then set the pageState based on the event
    setLoading(true);
    const singleEvent = await getSingleEvent(params.id);
    setEventState(singleEvent);
    setLoading(false);
    pageSetter(singleEvent);
  },[])
  
  // 0 - host (search location)
  // 1 - host (choose location)
  // 2 - host / participant (curated location)
  // 3 - invitee (join event)
  // 4 - participant (wait for host to choose location)
  
  //this function sets the pageState
  const pageSetter = (event) => {
    if (event.host.id == currentUser.uid){ //user is host of the event, pageState should be 0/1/2
      if (event.recommendedEateries.length === 0){
        setPageState(0);
      }else if (event.selectedEatery === ""){
        setPageState(1);
      }else{
        setPageState(2);
      }
    }else if (!event.participantsID.includes(currentUser.id)){
      setPageState(3);
    }else{
      setPageState(4);
    }
  }

  return (
    <div className={classes.root}>
      {pageState === 0 && (
        <Card
          left={<LeftSide pageState={pageState} id={params.id} event={eventState} loading={loading}/>}
          right={<HostSearch/>}
          pageState={pageState}
        />
      )}

      {pageState === 1 && (
        <Card
          left={<LeftSide pageState={pageState} id={params.id} event={eventState} loading={loading}/>}
          right={<h2>RIGHT SIDE</h2>}
          pageState={pageState}
        />
      )}

      {pageState === 2 && (
        <Card
          left={<LeftSide pageState={pageState} id={params.id} loading={loading}/>}
          right={<CuratedLocation />}
          pageState={pageState}
        />
      )}

      {pageState === 3 && (
        <Card
          left={<LeftSide pageState={pageState} id={params.id} event={eventState} loading={loading}/>}
          right={<JoinYourFriends />}
          pageState={pageState}
        />
      )}

      {pageState === 4 && (
        <Card
          left={<LeftSide pageState={pageState} id={params.id} event={eventState} loading={loading}/>}
          right={<WaitForLocation />}
          pageState={pageState}
        />
      )}
    </div>
  );
}
