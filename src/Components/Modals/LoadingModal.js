import React from 'react'
import LoadingGif from "../../Assets/LoadingGif.svg"
import classes from "./LoadingModal.module.css"

export default function LoadingModal(props) {
    return (
        <>
        {props.isLoading && 
        <>
        <div className={classes.pic}>
            <img className={classes.spinner} src={LoadingGif}/>
        </div>
            <div className={classes.overlay}> </div>
        </>}
        </>
        
    )
}
