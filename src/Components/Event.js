import React from 'react'
import classes from './Event.module.css'

export default function Event(props) {
    const PARTICIPANTARRAY = props.participants

    return (
        <div className = {classes.root}>
            <div className = {classes.leftContainer}>
                <h1>{props.title}</h1>
                <p className = {classes.fontsize}>📍{props.location}</p>
                <p className = {classes.fontsize}>⏰{props.dateTime}</p>
            </div>
            <div className = {classes.rightContainer}>
            {PARTICIPANTARRAY.map((participant, index) => (
            <p>{participant}</p> 
            ))}
            </div>
        </div>
    )
}
