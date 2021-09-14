import React from 'react'
import ConfirmDeleteModal from '../Components/Modals/ConfirmDeleteModal'
import classes from './TestPage.module.css'

export default function TestPage() {
    return (
        <div className = {classes.pageStyle}>
            <ConfirmDeleteModal/>
        </div>
    )
}
