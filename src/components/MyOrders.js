
import React, { Component } from 'react'
import {connect} from 'react-redux'
// import CartItem from './CartItem'
import * as actionTypes from '../Store/actions'
import {Link} from 'react-router-dom'
// import Modal from '../Modal'
// import classes from './Components/CSS/cartitem.module.css'
import Summary from './Summary'


class MyOrders extends Component {
   
    // state={
    //     loading : true
    // }


    componentDidMount () {
            this.props.fetchOrder(this.props.token, this.props.userId )    
    }

    render () {
        let orders = <h2>LOADING !</h2>;
        if ( this.props.orders.length>=0 ) {
            orders = this.props.orders.map( order => (
                <Summary  pricing={order.pricing} cart={order.cart}/>
            ) )
        }
        return (
            <main>
            <div style={{marginTop:'4rem'}}>
                {orders}
            </div></main>
        );
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
        userId : state.userId,
        orders : state.orders

}}

const mapDispatchToProps= dispatch =>{
    return{
        
        fetchOrder : (token, userId)=>dispatch(actionTypes.fetchOrders( token, userId)),
       
    }
}
 

export default connect (mapStateToProps,mapDispatchToProps)(MyOrders);