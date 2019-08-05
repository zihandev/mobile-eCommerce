import React from 'react'
import {connect} from 'react-redux';
import * as actionTypes from '../../Store/actions'
import classes from '../CSS/cartitem.module.css'
import {FaTrash, FaPlus, FaMinus} from 'react-icons/fa'

 function CartItem(props) {
    return (
       
            <div className={classes.item}>
                 <div className={classes.try}>
               <div className={classes.title}> <h2>{props.title}</h2> 
                <strong style={{marginTop: "1rem"}}>Quantity : {props.count}</strong> 
                <img className={classes.img} src={props.img}  alt='img'/> </div>
                <div className={classes.del}>
                    <div className={classes.signs}>
        <FaPlus  onClick={()=>props.onIncrease(props.id)} className={classes.add}/>
        <FaMinus onClick={()=>props.onDecrease(props.id)} className={classes.minus}/></div>
        <FaTrash onClick={()=>props.onRemove(props.id)} className={classes.trash} />
       </div>
       <div className={classes.price}> <h3>Price: ${props.price}</h3>  </div>
       </div>
            </div>
     
    )}


const mapDispatchToProps =(dispatch)=>{
return{
   onIncrease : (id)=>dispatch(actionTypes.increase(id)),
   onDecrease : (id)=>dispatch(actionTypes.decrease(id)),
   onRemove : (id)=>dispatch(actionTypes.remove(id)) 
}
}

export default connect(null, mapDispatchToProps)(CartItem);










{/* <span className= 'btn btn-black' onClick={()=>props.onIncrease(props.id)} style={{border : '5px solid black'}}>+</span>
<span className= 'btn btn-black' onClick={()=>props.onDecrease(props.id)} style={{border : '5px solid black'}}>-</span> */}