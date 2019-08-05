import React from 'react'
import classes from './Backdrop.module.css';

export default function Backdrop(props) {
    return (
        <div onClick={props.click} className={classes.Backdrop}/>
            
    )
}
