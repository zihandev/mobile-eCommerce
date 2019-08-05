 
 import {allProducts} from '../components/data';
//import { addingToCart, increase } from './actions';
 
 const initialState = {
      products: [],
        detailProduct: 'detailProduct',
        cart: [],
        modalOpen: false,
        modalProduct: 'detailProduct',
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0,
        orders:[],
        isAuthenticated : false,
        token:null,
        price : 100,
        orders : [],
        checked : false
       
      };


      const getItem = (state, id) => {
        const product = state.products.find(item => item.id === id);
        return product;
      };

       const updateObject = (oldObject, updatedProperties) => {
        return {
            ...oldObject,
            ...updatedProperties
        };
    };

      const purchaseSuccess = ( state, action ) => {
        const newOrder = updateObject( action.orderData, { id: action.orderId } );
        return updateObject( state, {
            loading: false,
            purchased: true,
            orders: state.orders.concat( newOrder )
        } );
    };


    const fetchOrdersSuccess = ( state, action ) => {
        return updateObject( state, {
            orders: action.orders,
            loading: false
        } );
    };
    

const addToCart =(state,action)=>{
   const tempProducts = [...state.products];
   const index = tempProducts.findIndex(item=>item.id===action.id)
   const product = {...tempProducts[index]}
   product.inCart = true;
   product.count = 1;
   product.total = product.price;
   tempProducts[index]= product;
            return{ ...state,
                products : [...tempProducts],
                cart : [...state.cart, product]
} }


const increase = (state, action)=>{
    const tempCart = [...state.cart]
    //find the item
    const index = tempCart.findIndex(item=>item.id===action.id)
    const product = {...tempCart[index]}
    product.count += 1 ;
    product.total = product.count * product.price;
    tempCart[index]= product;
    state.cart = [...tempCart]
    addTotals(state,action)
    return{...state,
        cart : [...tempCart],
        // total : {...addingTotals(state, action)}
        }
}


const decrease=(state, action)=>{
    const tempProduct = [...state.cart]
    const index = tempProduct.findIndex(item=>item.id===action.id) 
    const product = {...tempProduct[index]}
    product.count -= 1;
    product.total = product.count * product.price;
    tempProduct[index]= product;
    return {...state,
    cart : [...tempProduct],
   
    }
}

const getTotals = (state,action) => {
  
    const tempProduct = [...state.cart]

    let subTotal = 0;
    tempProduct.map(item => (subTotal += item.total));
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    return {
      subTotal,
      tax,
      total
    };
  };



  const addTotals = (state, action) => {
    const totals = getTotals(state, action);
    console.log('Adding Totals');
    
        return {
            ...state,
          cartSubTotal: totals.subTotal,
          cartTax: totals.tax,
          cartTotal: totals.total
        };
      }
      

const remove=(state, action)=>{
    let tempProducts = [...state.products];
    let tempCart = [...state.cart];

    const index = tempProducts.indexOf(getItem(state, action.id));
    let removedProduct = tempProducts[index];    //directly mutating the state
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;


   tempCart = tempCart.filter(item=>item.id!==action.id)
    return{...state,
        cart : [...tempCart],
        // products: [...tempProducts]
    }

}

const clearedAll =(state, action)=>{
    console.log("REACHED");
    
    return {
        ...state,
        products: [...allProducts],
        cart : []
    }
}

const check=(state,action)=>{
    console.log('I am Called');
    
    return{
        ...state,
        check : true
    }
}


// const success =(state,action)=>{
//     console.log('I am Success');
//     const orderr= action.orderData
//     return{...state,
//         orders : state.orders.concat(orderr) //have same propery so just cant spread out
//     }
    
// }

const authSuccess= (state,action)=>{
    return{...state,
        token : action.token,
        userId : action.id,
        isAuthenticated : true
    }
}


const authFail= (state,action)=>{
    return{...state,
        error : action.error
    }
}

// create a reducer with initial state
const reducer = (state=initialState, action) =>{
    switch(action.type){
            case 'SET_PRODUCTS':
            return {...state,
            products: [...allProducts],
            checked : true
            }

            case 'ADD_TO_CART':
            return addToCart(state, action);

            case 'INCREASE' : 
            return increase(state, action);

            case 'DECREASE' : 
            return decrease(state, action);

            case 'REMOVE' :
            return remove(state, action);

            case 'CLEAR' :
            return clearedAll(state,action);

            case 'CHECK' :
            return check(state,action);

            // case 'SUCCESS':
            // return success(state,action)

            case 'AUTH_SUCCESS':
            return authSuccess(state,action)

            case 'AUTH_FAIL':
            return authFail(state,action)

            case 'PURCHASE_SUCCESS':
            return purchaseSuccess(state,action)

            case 'FETCHED_ORDERS_SUCCESS':
            return fetchOrdersSuccess( state, action );

            
            case 'GET_TOTALS':
            return addTotals(state,action)

            default:
            return state;
    }
};

export default reducer;











  // const subTotal = this.state.cart
    //   .map(item => item.total)
    //   .reduce((acc, curr) => {
    //     acc = acc + curr;
    //     return acc;
    //   }, 0);