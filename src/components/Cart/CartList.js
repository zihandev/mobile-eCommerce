import React, { Component } from 'react'
import {connect} from 'react-redux'
import CartItem from './CartItem'
import * as actionTypes from '../../Store/actions'
import {Link} from 'react-router-dom'
import Modal from '../Modal'
import classes from '../CSS/cartitem.module.css'


 class CartList extends Component {
    state={
        purchasing : false
    }

    componentDidMount(){
        this.props.getTotals();
    }




ordered=()=>{
    const ordering={
        pricing : this.props.total,
        cart : this.props.getCart,
    userId: this.props.userId
 }
    this.props.orderData(ordering, this.props.token)
    setTimeout(()=>this.fetchOrders(), 5000)
    this.props.history.push('/')
}

fetchOrders=()=>{
   
    this.props.fetchOrder(this.props.token, this.props.userId )
}

   
//only if authenticated display MODAL else redirect to sign in form
   orderHandler =()=>{
       if (this.props.isAuthenticated){
           this.setState({purchasing : true})}
           else{
               this.props.history.push('/forms')
           }
       }
       
    modalClicked=()=>{
        this.setState({purchasing : false})
    }
   
    render() {
        const mapped = this.props.getCart.map(item => {
            return ( 
                <CartItem key={item.id} 
                title={item.title}
                count = {item.count}
                id= {item.id}
                img={item.img}
                inCart={item.inCart}
                price={item.price}
                />
            )
        })



        let cart = (<> <div className={classes.container}>
        {mapped}</div>
         <div >
     
            <div className={classes.totals}>
           <h3><em>Sub Total</em> : ${this.props.subtotal}</h3>
           <h3><em>Tax</em> : ${this.props.tax}</h3>
           <h3><em>Total </em>: ${this.props.total}</h3></div>
          <div className={classes.pricey}><button onClick={this.orderHandler} className={classes.btn}>{this.props.isAuthenticated?'PROCEED TO CHECKOUT':'SIGN IN TO ORDER'}</button></div> 
<div className={classes.bottom}>
        <Link to='/'><button style={{  marginLeft : '3rem'}} className= 'btn-primary'>PRODUCTS PAGE</button></Link>
         <button className= 'btn-danger' onClick={()=>this.props.clearAll()} style={{  marginRight : '3rem'}}>CLEAR CART</button> 
         </div>            
         </div></>)

         
        if(this.props.getCart.length<1){
            cart = (<><div className={classes.empty}><h2>Your Cart Is Empty !</h2>  </div>
            <Link to='/'><button style={{  marginLeft : '3rem'}} className= 'btn-primary'>PRODUCTS PAGE</button></Link> 
            </>)
            console.log('hey')
           }

      
        let modal = null;
        if(this.state.purchasing)
        {modal =(<Modal show={true} modalClicked={this.modalClicked} total={this.props.total} ordered={this.ordered}></Modal>)}

        return (
           <>
            {modal}
            {cart}
           </>
        )
    }}

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

const mapDispatchToProps= dispatch =>{
    return{
        getTotals : ()=>dispatch(actionTypes.getTotals()),
        orderData : (data, token)=>dispatch(actionTypes.order(data, token)),
        fetchOrder : (token, userId)=>dispatch(actionTypes.fetchOrders( token, userId)),
        clearAll : ()=>dispatch(actionTypes.clearAll())
    }
}
 

export default connect (mapStateToProps,mapDispatchToProps)(CartList);



// purchaseHandler = ()=> { 
//     this.props.check();
//      if(this.props.isAuthenticated){
//          this.props.history.push('/cart');
// }
// else {
//  this.props.history.push('/forms');
// }
//  }

{/* <button className={classes.Button_Order} onClick={this.purchaseHandler} style={style}>{this.props.isAuthenticated?'GO TO CART':'SIGN IN TO ORDER'}</button> */}