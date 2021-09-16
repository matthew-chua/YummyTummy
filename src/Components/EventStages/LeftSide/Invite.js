import React from 'react'

//css
import classes from "./Invite.module.css";

export default function Invite() {
    return (
        <div className={classes.root}>
            <p>Invite your friends:</p>
            <div className={classes.link}>
                <p className={classes.text}>https://www.yummytummy.com/event/redfrog93</p>
                <p className={classes.icon}>
                <i class="fa fa-copy"></i>
                </p>
            </div>
        </div>
    )
}
