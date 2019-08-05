import React from 'react'
import {Link} from 'react-router-dom';
import * as actions from '../Store/actions'
import {connect} from 'react-redux';

 function Product(props) {

   let start = ((props.start) -1) *4;
   //console.log(start);
   
   let end = ((props.end) *4);
    console.log(props.product);
   
   let output = props.product.slice(start,end).map(item=>{
       return <div key = {item.id} className="col-9 mx-auto col-md-6 col-lg-3 my-3" style={{textAlign:'center', display:'inline-block'}}>
       <div className ='card' key = {item.id} style={{textAlign:'center', display:'inline-block', borderRadius:'10px'}}>
           <Link to ='/details'><img src={item.img} style={{width:'70%'}} alt='img'/></Link>
           
           <button disabled={item.inCart} onClick={()=>props.addingToCart(item.id)}>{item.inCart?'ADDED TO CART':'ADD TO CART'}</button>
           <p style={{marginTop:'1px'}}><bold>{item.title}</bold></p>
           <strong >Price : <span>${item.price}</span></strong>
           </div>
           </div>
   })
   
    return (  
        <div>
            {output}
        </div>
    )
}


const mapDispatchtoProps = dispatch =>{
    return{
        addingToCart : (id)=>dispatch(actions.addingToCart(id))
    }
}

export default connect(null, mapDispatchtoProps)(Product);