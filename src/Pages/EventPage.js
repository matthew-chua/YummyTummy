import React from "react";
import { useState } from "react";
import Card from "../Components/Card";
import EditEventModal from "../Components/Modals/EditEventModal";

import classes from "./Page.module.css";

export default function EventPage() {
  return (
    <div className={classes.page}>
      <Card 
      left={<h1>left side</h1>} 
      right={<h2>right side</h2>} />
    </div>
  );
}
