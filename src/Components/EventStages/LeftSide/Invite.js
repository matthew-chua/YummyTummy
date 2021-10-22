import React from 'react'
import { useState } from 'react';

//css
import classes from "./Invite.module.css";

export default function Invite(props) {

    const [showCopiedMessage, setShowCopiedMessage] = useState(false);

    const copyLinkHandler = () => {
        navigator.clipboard.writeText(`https://yummytum.herokuapp.com/event/${props.id}`)
        setShowCopiedMessage(true);
        setTimeout(()=>{setShowCopiedMessage(false)}, 1000);
    }
    return (
        <div className={classes.root} >
            <p>Invite your friends:</p>
            <div className={classes.link}>
                {/* think input might be a better choice in this case */}
                {!showCopiedMessage && <input className={`${classes.text} ${classes.input}`} value={`https://www.yummytum.herokuapp.com/event/${props.id}`}></input>}
                {/* {!showCopiedMessage && <p className={classes.text}>{`https://www.yummytummy.com/event/${props.id}`}</p>} */}
                {showCopiedMessage && <p className={classes.text}>Copied!</p>}
                <p className={classes.icon} onClick={copyLinkHandler}>
                <i class="fa fa-copy"></i>
                </p>
            </div>
        </div>
    )
}
