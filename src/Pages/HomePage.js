import React from 'react'
import { useState } from 'react'
import { auth } from '../Auth/auth';
import CreateEventModal from '../Components/Modals/CreateEventModal';
import classes from './Page.module.css';

export default function HomePage() {

    const [createEventModal, setCreateEventModal] = useState(false);

    const createEventModalHandler = () => {
        setCreateEventModal(!createEventModal);
    }

    return (
        <div className={classes.page}>
            <h1>this is the home page</h1>
            <h3>Hello {auth.currentUser.displayName}</h3>
            <button onClick={createEventModalHandler}>Create Event!</button>
            { createEventModal && <CreateEventModal toggle={createEventModalHandler}/>}
        </div>
    )
}
