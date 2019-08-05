import axios from "axios";

export const addingToCart = (id)=>{
    return{
        type : 'ADD_TO_CART',
        id : id
    }
}

export const increased = (id) =>{
    return {
        type : 'INCREASE',
        id : id
    }
}



export const decreased = (id) =>{
    return {
        type : 'DECREASE',
        id : id
    }
}

export const removed = (id)=>{
    return{
        type: 'REMOVE',
        id : id
    }
}

export const clearAll =()=>{
    return{
        type: 'CLEAR'
    }
}

//  const purchaseSuccess=(order)=>{
//      return{
//          type: 'SUCCESS',
//          orderData : order
//      }
//  }

const authSuccess = (token, userId)=>{
    return{
        type: 'AUTH_SUCCESS',
        token : token,
        id : userId
    }}

const authFail=(error)=>{
return{
    type : 'AUTH_FAIL',
    error: error
}
}


export const checkSign =(authData, isSignUp)=>{
return dispatch => {
    let url=''
if(isSignUp){
     url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyD-vlfUhDddSCI9Nt8l-uaEmxXy7XU2m3I' }
else {url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyD-vlfUhDddSCI9Nt8l-uaEmxXy7XU2m3I'}
    axios.post(url,authData)
.then(res=> {
    console.log(res)
    dispatch (authSuccess(res.data.idToken, res.data.localId))
})
.catch(err=>{   
    dispatch(authFail(err.response.data.error.message));
    
})
}}

export const increase =(id)=>{
    return dispatch => {
        dispatch(increased(id))
        dispatch(getTotals())
       
    }
}

export const decrease =(id)=>{
    return dispatch => {
        dispatch(decreased(id))
        dispatch(getTotals())
       
    }
}


export const remove =(id)=>{
    return dispatch => {
        dispatch(removed(id))
        dispatch(getTotals())
       
    }
}

export const purchaseSuccess = ( id, orderData ) => {
    return {
        type: 'PURCHASE_SUCCESS',
        orderId: id,
        orderData: orderData
    };
};

export const fetchOrdersSuccess = ( orders ) => {
    return {
        type: 'FETCHED_ORDERS_SUCCESS',
        orders: orders
    };
};


export const order =(order, token) =>{
    return dispatch =>{
        console.log("heyThere");
        
        axios.post('https://ecommerce-react-app.firebaseio.com/orders.json?auth=' + token, order)  //post order if signed in 
        .then(res=>{
            console.log(res.data);
            dispatch(purchaseSuccess(res.data.name, order))
        })
        .catch(error=>{
            console.log(error.response.data)
        })
    }
}


export const fetchOrders = (token, userId) => {
    return dispatch => {
        // dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get( 'https://ecommerce-react-app.firebaseio.com/orders.json' + queryParams)
            .then( res => {
                const fetchedOrders = [];   
                for ( let key in res.data ) {
                    fetchedOrders.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
                console.log(fetchedOrders);
                dispatch(fetchOrdersSuccess(fetchedOrders));
            } )
            .catch( err => {
                console.log(err.response.data)
            } );
    };
};

export const getTotals=() => {
    return {
        type : 'GET_TOTALS'
    }
}










/*
add to cart
--add the product to CART property in global state
--the product to be added is identified via ID


addToCart = (id) =>{
    const temp = {...this.state.products}
    const toBeAdded = temp.find(item=>item.id===id)    --we are directly mutating state here
    toBeAdded.count = 1;                       --this will mutate objects inside array of state , since not deep cloned 
    tobeAdded.inCart = true;                   --convert this object into array and place inside cart[]
    toBeAdded.total = toBeAdded.price;
    this.setState({cart : [...this.state.cart, toBeAdded], products: })
}

--


*/