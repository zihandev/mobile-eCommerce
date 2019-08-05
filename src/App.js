import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css' //access bootstrap from node modules


import {Switch,Link, Route, withRouter}from 'react-router-dom';

import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Details from './components/Details';
import Cart from './components/Cart/CartList';
import Auth from './components/form';

import { connect } from 'react-redux';
import Toolbar from './components/Toolbar';
import Theming from './components/Theming';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop';

import MultipleSelect from './components/multipleSelect'
import MyOrders from './components/MyOrders';

class App extends Component {
  state={
    sideDrawerOpen : false
  }
  toggleHandler=()=>{
    this.setState({sideDrawerOpen:!this.state.sideDrawerOpen})
  }
  toggledHandler=()=>{
    this.setState({sideDrawerOpen:false})
  }



  render(){

 

    let opening=null;
    let openingOne=null;
    if(this.state.sideDrawerOpen){
      opening = <Backdrop click={this.toggledHandler}/>
      openingOne= <SideDrawer />
    }
    return(
        <>
        <Route path = "/" component = {Toolbar}/>
        {/* navbar rendered in all components */}
        {/* <Route path = "/"  render={() => <Toolbar clicked={this.toggleHandler} />} /> */}
        {/* <Route path = "/"  component = {Theming} /> */}
      
       
       {opening}
       {openingOne}
    <Switch>
      <Route path = "/details" component = {Details}/>
      <Route path = "/cart" component = {Cart}/> 
      <Route path = "/myorders" component = {MyOrders}/> 
      <Route path = "/forms" component = {Auth}/> 
      <Route path = "/" component = {ProductList}/>   
    </Switch>

      </>
    );
  }
}

export default App;
