//config
import React, { Component } from 'react';
import Input from './input';
import axios from 'axios';
import Spinner from './spinner';
import {connect} from 'react-redux';
import * as actionTypes from '../Store/actions'
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom'


class Auth extends Component {
    state = {
        controls : {
            email : {
                elementType : 'input',
                elementConfig : {
                    type : 'email',
                    placeholder : 'Mail Address'
                },
                value: '',
                validation :{
                    required : true,
                    isEmail : true 
                },
                valid : false,
                message : "Please enter a Valid EMAIL",
                touched : false
            },
            password : {
                elementType : 'input',
                elementConfig : {
                    type : 'password',
                    placeholder : 'PASSWORD'
                },
                value : '',
                validation : {
                    required : true,
                    minLength: 6
                },
                message : "Password must be atleast 6 charachters long",
                valid : true,
                touched : false
            },
            // zipcode : {
            //     elementType : 'input',
            //     elementConfig :{
            //         type : 'text',
            //         placeholder : 'ZIP CODE'
            //     },
            //     value : '',
            //     validation : {
            //         required : true,
            //         minLength : 3,
            //         maxLength : 7,
            //         isNumeric : true
            //     },
            //     valid : false,
            //     message : "Please enter a Valid Numeric Zip Code",
            //     touched : false
            // }
        },
            formIsValid : false,
            ordered: false,
            loading: false,
            signUp : false
        }

        
        orderHandler = (event) =>{
            event.preventDefault();
                this.setState({loading:true})

            const formData = {};
            for (let formElement in this.state.controls){
                formData[formElement]= this.state.controls[formElement].value;
            }

            const order ={
                cart : this.props.cart,
            }

           //  this.props.orderData(order);

                const authData = {
                    email : this.state.controls.email.value,
                    password : this.state.controls.password.value,
                    returnSecureToken : true
                }
                this.props.checkSign(authData, this.state.signUp)
                this.setState( { loading: false })
               
        }
          

    
        checkValidity(value, rules){
            let isValid = true;
            if(rules.required){
                isValid = value.trim !== '' && isValid;//isValid should satisfy all fields
            }

            if(rules.minLength){
                isValid = value.length >= rules.minLength && isValid
            }

            if(rules.maxLength){
                isValid= value.length<=rules.maxLength && isValid
            }

            if (rules.isEmail) {
                const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                isValid = pattern.test(value) && isValid
            }

            if (rules.isNumeric) {
                const pattern = /^\d+$/;
                isValid = pattern.test(value) && isValid
            }

            return isValid;
        }

            signed =()=>this.setState({signUp:!this.state.signUp})

        inputChangedHandler = (event, id) =>{
            const updatedControls = {
                ...this.state.controls,
                [id] : {
                    ...this.state.controls[id],
                    value : event.target.value,
                    valid : this.checkValidity(event.target.value, this.state.controls[id].validation),
                    touched:true
                }}
                let formIsValid = true;
                //  for (let id in updatedControls){
                    formIsValid = updatedControls[id].valid && formIsValid;
                //  }
                this.setState({controls:updatedControls, formIsValid : formIsValid})
        }

        //create array from object
        render(){
            const formElementsArray = [];
            for (let key in this.state.controls){
                formElementsArray.push({
                id : key, //1 iteration --> id : email
                config : this.state.controls[key] 
            })
        }
        
        


//render array elements into JSX
        let form = (<div className= 'container'>
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        errorMessage = {formElement.config.message}
                        />
                ))}
                 <button style={{marginTop : '20px'}} disabled={!this.state.formIsValid}>ORDER</button>
            </form>
        {/* <button style={{marginTop :'10%', color:'green', border : '1px solid red',borderRadius:'100px', textDecoration:'none'}}>{this.state.signUp?'Already A User? Sign-In':'Sign-Up'}</button> */}
            </div>);

        if(this.state.loading){
            form = <Spinner/>
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to='/cart'/>
            // <Redirect to={this.props.authRedirectPath}/>
        }

        let error=null;
        let text=null;

        if(this.props.authFail){
             text = this.props.authFail  //EMAIL_NOT_FOUND
            text = text.toLowerCase()
                    .split('_')  //EMAIL NOT FOUND
                    .map((s)=>s.charAt(0).toUpperCase()+s.substring(1)) //[Email Not Found]
                    .join(' ')+' !'
            error = <p style={{fontSize:'30px', color:'red'}}>{text}
            <span style={{fontSize:'15px',  display:'block'}}>TRY AGAIN</span></p>;
        }

            return <div class='container' style={{paddingTop: '10%'}}>
            <div style={{marginTop:'50px',textAlign:'center'}}>
                    {authRedirect}
                    {error}
                    {form}
                    {/* <Link to='/cart'><button style={{marginTop: '20px'}}>CART TO CHECK AUTH ORDER</button></Link> */}
                    <h3 style={{marginTop:'50px',textAlign:'center', cursor:'pointer', color:'brown'}} onClick={(this.signed)}>{this.state.signUp?'Switch to Sign-In':' Switch to Sign-Up'}</h3>
                    </div></div>

            
}
}

const mapStateToProps = state =>{
    return{
        cart : state.cart,
        authFail : state.error,
        isAuthenticated: state.token !== null,
    }
}

const mapDispatchtoProps = dispatch =>{
    return{
       checkSign : (authData, isSignUp)=>dispatch(actionTypes.checkSign(authData, isSignUp))
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(Auth);




//dynamically render form elements