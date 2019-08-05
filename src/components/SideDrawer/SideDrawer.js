import React from 'react'
import classes from './SideDrawer.module.css'


//this component is independent of toolbar 

export default function SideDrawer() {
    return (
        <nav className={classes.SideDrawer}>
            <ul>
                <li><a href='/'>Products</a></li>
                <li><a href='/'>Users</a></li>
            </ul>
        </nav>
    )
}
