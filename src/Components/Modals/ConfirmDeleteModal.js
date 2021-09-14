import React from 'react'
import classes from './ConfirmDeleteModal.module.css'

export default function ConfirmDeleteModal() {
    return (
        <div className = {classes.root}>
            <h1 className = {classes.bigFont}>Are you sure you want to delete this event?</h1>
            <h3 className = {classes.smallFont}>This cannot be undone</h3>
            <div className = {classes.buttons}>
                <button className = {classes.leftButton}>Cencel</button>
                <button className = {classes.rightButton}>Delete</button>
            </div>        
        </div>
    )
}
