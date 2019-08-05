import React from 'react'
import {FaCreditCard} from 'react-icons/fa';
import classes from './myorder.module.css';

const Summary = (props) => {

   let cart =  props.cart.map((item,i) =>(<div className={classes.summarize}>
        <h2>{i+1}. {item.title}</h2>
        <h3>Price : ${item.price}</h3>
        <h6>Quantity : {item.count}</h6>
        </div>
    ))


    return (
        <div className={classes.container}>
           <div style={{marginLeft:'2rem'}}> <h2><FaCreditCard/> Total Pricing : ${props.pricing}</h2></div>
           <div>  {cart} </div>
        </div>
    )
}

export default Summary
