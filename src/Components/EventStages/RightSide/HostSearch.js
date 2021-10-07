import React from 'react'
import { useState } from 'react'
import pic from '../../../Assets/location_by_Icons8.gif'

//css
import classes from './HostSearch.module.css'

export default function HostSearch(props) {

    const [showEateries,setShowEateries] = useState(false);

    const toggleShowEateries = () => {
        setShowEateries(prev => !prev)
    }

    return (
        <div className={classes.root}>
            <img src={pic} className={classes.img}/>

            <div className={classes.text}>
                <h1 className={classes.title}>Find Location</h1>
                <p className={classes.description}>When all friends have responded, hit the search button!</p>
                <p className={classes.description}>We’ll suggest a handful of optimal diners for you to choose based on their location, 
                    reviews and what’s still open at this time!</p>
                <button className={classes.btn} onClick={toggleShowEateries}>Search</button>
            </div>
        </div>
    )
}
