import React from 'react'
import classes from './DrawerToggleButton.module.css';


//should open the side drawer and clicking on it should close it
export default function DrawerToggleButton(props) {
    return (
        <button onClick={props.clicking} className={classes.Toggle_Button}>
            <div className= {classes.ToggleButtonLine}/>
            <div className= {classes.ToggleButtonLine}/>
            <div className= {classes.ToggleButtonLine}/>

        </button>
    )
}
