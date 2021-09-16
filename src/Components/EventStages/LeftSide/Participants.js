import React from 'react'

//css
import classes from "./Participants.module.css";

export default function Participants(props) {

    const participantArray = props.participants;
    
    return (
        <div>
            <p>Who's Coming:</p>
            {participantArray.map((participant, index)=> (
                <p className={classes.names}>{participant}</p>
            ))}
        </div>
    )
}
