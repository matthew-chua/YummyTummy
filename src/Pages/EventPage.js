import React from 'react'
import { useState } from 'react';
import EditEventModal from '../Components/Modals/EditEventModal';

import classes from './Page.module.css';

export default function EventPage() {

    const [editModal, setEditModal] = useState(false);

    const editModalHandler = ()=> {
        setEditModal(!editModal);
    }

    return (
        <div className={classes.page}>
            <h1>this is the old event page</h1>
            <button onClick={editModalHandler}>EDIT EVENT</button>
            {editModal && <EditEventModal toggle={editModalHandler}/>}
        </div>
    )
}
