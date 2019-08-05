import React from 'react'
import classes from './Toolbar.module.css';
import {Link} from 'react-router-dom';
import DrawerToggleButton from './SideDrawer/DrawerToggleButton';
import {connect} from 'react-redux';

 function Toolbar(props) {
     let display = null;
    if (props.isAuthenticated){ 
        display = (<li><Link to='/cart'>CART</Link></li>)
    }

    let display2 = null;
    if (props.isAuthenticated){ 
        display2 = (<li><Link to='/myorders'>MY ORDERS</Link></li>)
    }


    const loginHandler = ()=> { 
         if(props.isAuthenticated){
             props.history.push('/');
}
 else {
     props.history.push('/forms');
 }
     }

    return (
       <header className={classes.Toolbar}>
           <nav className={classes.Toolbar_Navigation}>
               <div>
               <DrawerToggleButton clicking={props.clicked}/>
               </div>
            <div className={classes.Toolbar_Logo}><a href='/'>THE LOGO</a></div>
            <div className={classes.Spacer}/>
            {/* add unordered list to hold navigation items */}
           <div className={classes.Toolbar_Navigation_Items}>
            <ul>
                <li><Link to='/'>HOME</Link></li>
                {display}
                {display2}
                <li><Link onClick={loginHandler}>{!props.isAuthenticated?'LOGIN':'LOGOUT'}</Link></li>
                </ul>
                </div>
            </nav>
            </header>
    )
}

const mapStateToProps = state =>{
    return{
        isAuthenticated : state.token!=null
};
}


export default connect(mapStateToProps)(Toolbar);