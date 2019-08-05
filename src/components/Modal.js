import React, { Component } from 'react'
import classes from './spinner.module.css';
import {connect} from 'react-redux';

 class Modal extends Component {
    render() {
    
        let disp = this.props.getCart.map((cart,i)=>(
            <p><strong>{i+1}.</strong>  {cart.title}</p>
        ))

        return (
            <>
            <div className={classes.Modal}
             style={{
                   transform: this.props.show ? 'translateX(0)' : 'translateX(-100%)',
                        opacity: this.props.show ? '1' : '0'
                    }}> 
                  <p style={{borderBottom: '.8px solid black'}}>SUMMARY OF YOUR ORDER </p>
                  <h4>Total Pricing : ${this.props.total}</h4>
                  <h6>{this.props.getCart.length} Items :</h6>
                  <div className={classes.mod}>{disp}</div>
                  <button className={classes.btn} onClick ={this.props.modalClicked}>GO BACK</button>
                  <button className={classes.btnsec}  style ={{ marginLeft:'10px'}} onClick={this.props.ordered}>ORDER NOW</button>
                 </div>   
            </>
        )
    }
}
const mapStateToProps = state =>{
    return {
        getCart : state.cart,
        orderData : state.cart ,
        isAuthenticated : state.token!=null,
        price : state.price,
        token : state.token,
        subtotal : state.cartSubTotal,
        tax : state.cartTax,
        total : state.cartTotal,
        userId : state.userId

}}



 
export default connect (mapStateToProps)(Modal);