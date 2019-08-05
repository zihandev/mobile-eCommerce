import React,{Component} from 'react'
import Product from './Product';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import classes from './spinner.module.css'
import Theming from './Theming.js'
import Pagination from './PaginationButton'

class ProductList extends Component {
    state ={
        search : '',
        paginationValue : 1,
        check : true
    }

    updateSearch =(event)=>{
        this.setState({search : event.target.value})
    }

    buttonClicked=( e)=>{
      
        this.setState({paginationValue : e.target.closest('.inline').dataset.goto})
        console.log(e.target.closest('.inline').dataset.goto);
        console.log(this.state.paginationValue)
    }
    
        

        purchaseHandler = ()=> { 
        this.props.history.push('/cart');
    }
        

    render(){
        let dispaled = ()=> this.props.setProducts();

        if(this.props.checked===false){  
           dispaled();
        
       
        this.setState({check : false});
        console.log(this.state) }


    //  rendering search elements
    let filteredResults = this.props.products.filter(product=>{
        return product.title.toLowerCase().indexOf(this.state.search.toLowerCase())!==-1;
    })

    const styled ={
        borderRadius:'100px',
        outline:'none'
        
        }

        let display =  (<Product 
        start = {this.state.paginationValue}       
         
        end = {this.state.paginationValue}
        product={filteredResults}/>)
        
        if ( filteredResults==0){
            display = (<div className={classes.results}><h2>Sorry No Results Found !</h2></div>)
        }

       //let write= (this.state.goToPage) 
       //console.log(write);
       
//let page = this.state.paginationValue;

        const style={backgroundColor : 'grey', float: 'top', display:'inline',  paddingLeft: '2%'}



    return (<>
        <Theming > 
        <div  className='container'>

         
             <h1 style={{textAlign:'center'}}>Products</h1>
             <input className={classes.placeholder} type='text' value={this.state.search} onChange={this.updateSearch} placeholder='SEARCH FOR PRODUCTS' 
             style={styled}/>

             {display}
            
            <Pagination page={this.state.paginationValue} clicked={this.buttonClicked}/>

           
            <button className={classes.Button_Order} onClick={this.purchaseHandler} style={style}>GO TO CART</button>
             {/* //map through the products array to display each information */}

         </div> </Theming></>
        )
    }}


const mapStateToProps = state =>{
    return{
        products : state.products,
        checking : state.check,
        isAuthenticated : state.token!=null,
        checked : state.checked
};
}

const mapDispatchToProps = dispatch =>{
    return{
onAdded : ()=>dispatch({type:'RESET'}),
setProducts : ()=>dispatch({type:'SET_PRODUCTS'}),
check : ()=>dispatch({type:'CHECK'})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);




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


  {/* <Product 
            // addToCart = {this.added}
            product={this.props.products}/>        */}