
import classes from './input.module.css'
import React from 'react'

export default function Input(props) {
let inputElement = null;
//array of 2 css classes 
const inputClasses = [classes.InputElement];

let validationError = null;
if (props.touched && props.invalid  ) {
    validationError = <p className={classes.ValidationError}>{props.errorMessage}</p>;
}

if(props.invalid && props.shouldValidate && props.touched){
    inputClasses.push(classes.Invalid);
}

    switch(props.elementType){
        case ('input') :
            inputElement = <input style={{marginTop:'10px'}} className={inputClasses.join(' ')}
            {...props.elementConfig}
            value = {props.value}
            onChange= {props.changed} />;
            break;

        default : return null;
            
    }


    return (
        <div>
            {inputElement}
            {validationError }
        </div>
    )
}
