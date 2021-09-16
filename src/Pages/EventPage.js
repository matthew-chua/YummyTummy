import React from "react";
import { useState } from "react";

//components
import Card from "../Components/Card";
import LeftSide from "../Components/EventStages/LeftSide/LeftSide";

//css
import classes from "./EventPage.module.css";

export default function EventPage() {
  const [pageState, setPageState] = useState(4);

  return (
    <div className={classes.root}>
      {pageState == 0 && (
        <Card
          left={<LeftSide pageState={pageState} />}
          right={<h2>right side</h2>}
          pageState={pageState}
        />
      )}

      {pageState == 1 && (
        <Card
          left={<LeftSide pageState={pageState} />}
          right={<h2>right side</h2>}
          pageState={pageState}
        />
      )}

      {pageState == 2 && (
        <Card
          left={<LeftSide pageState={pageState} />}
          right={<h2>right side</h2>}
          pageState={pageState}
        />
      )}

      {pageState == 3 && (
        <Card
          left={<LeftSide pageState={pageState} />}
          right={<h2>right side</h2>}
          pageState={pageState}
        />
      )}

      {pageState == 4 && (
        <Card
          left={<LeftSide pageState={pageState} />}
          right={<h2>right side</h2>}
          pageState={pageState}
        />
      )}
    </div>
  );
}
