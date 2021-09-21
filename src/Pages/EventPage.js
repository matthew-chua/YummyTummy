import React from "react";
import { useState } from "react";

//components
import Card from "../Components/Card";
import LeftSide from "../Components/EventStages/LeftSide/LeftSide";
import JoinYourFriends from "../Components/EventStages/RightSide/JoinYourFriends";
import HostSearch from "../Components/EventStages/RightSide/HostSearch";
import WaitForLocation from "../Components/EventStages/RightSide/WaitForLocation";

//css
import classes from "./EventPage.module.css";

export default function EventPage() {
  const [pageState, setPageState] = useState(3);

  // 0 - host (search location)
  // 1 - host (choose location)
  // 2 - host / participant (curated location)
  // 3 - invitee (join event)
  // 4 - participant (wait for host to choose location)

  //insert logic here to setPageState

  return (
    <div className={classes.root}>
      {pageState === 0 && (
        <Card
          left={<LeftSide pageState={pageState} />}
          right={<h2>right side</h2>}
          pageState={pageState}
        />
      )}

      {pageState === 1 && (
        <Card
          left={<LeftSide pageState={pageState} />}
          right={<HostSearch />}
          pageState={pageState}
        />
      )}

      {pageState === 2 && (
        <Card
          left={<LeftSide pageState={pageState} />}
          right={<h2>right side</h2>}
          pageState={pageState}
        />
      )}

      {pageState === 3 && (
        <Card
          left={<LeftSide pageState={pageState} />}
          right={<JoinYourFriends />}
          pageState={pageState}
        />
      )}

      {pageState === 4 && (
        <Card
          left={<LeftSide pageState={pageState} />}
          right={<WaitForLocation />}
          pageState={pageState}
        />
      )}
    </div>
  );
}
