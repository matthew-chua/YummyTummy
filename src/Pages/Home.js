import React from 'react'
import { useState } from 'react'
import CreateEventModal from '../Components/Modals/CreateEventModal';

export default function Home() {

    const [createEventModal, setCreateEventModal] = useState(false);

    const createEventModalHandler = () => {
        setCreateEventModal(!createEventModal);
    }
    return (
        <div>
            <h1>this is the home page</h1>
            <button onClick={createEventModalHandler}>Create Event!</button>
            { createEventModal && <CreateEventModal toggle={createEventModalHandler}/>}
        </div>
    )
}
