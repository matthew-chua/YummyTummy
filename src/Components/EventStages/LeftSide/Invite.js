import React from 'react'
import { useState } from 'react';

//css
import classes from "./Invite.module.css";

export default function Invite(props) {

    const [showCopiedMessage, setShowCopiedMessage] = useState(false);

    const copyLinkHandler = () => {
        navigator.clipboard.writeText(`https://www.yummytummy.com/event/${props.id}`)
        setShowCopiedMessage(true);
        setTimeout(()=>{setShowCopiedMessage(false)}, 1000);
    }
    return (
        <div className={classes.root} >
            <p>Invite your friends:</p>
            <div className={classes.link} onClick={copyLinkHandler}>
                {!showCopiedMessage && <p className={classes.text}>https://www.yummytummy.com/event/{props.id}</p>}
                {showCopiedMessage && <p className={classes.text}>Copied!</p>}

                <p className={classes.icon}>
                <i class="fa fa-copy"></i>
                </p>
            </div>
        </div>
    )
}
