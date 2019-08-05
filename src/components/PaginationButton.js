import React, { Component } from 'react'
import classes from './spinner.module.css'

export default class Pagination extends Component {
    
    numResults = 10;
    resPerPage = 4;


    render() {
        const styling = {
            display :'inline' ,
            marginLeft : '3px',
            marginBottom : '8px',
            left : '180px',
            // padding : '1px',
            borderRadius : '30px',
            border : '1px solid black',
            outline : 'none'
        }
        const createButton = (page, type) => {
            return <div ><button className={classes.Paginate} class='inline' data-goto={type === 'prev' ? page - 1 : page + 1} onClick ={(e)=>this.props.clicked(e)} style={styling} 
            className="btn-inline results__btn--${type}">
             <span style={{padding : '1px', fontSize:'12px'}}>Page </span>
             <input style={{backgroundColor : 'inherit', outline:'none', border:'none', padding : '1px', fontSize:'12px'}}type='button' value={type === 'prev' ? Number(page - 1) :  Number(page + 1)} />
             {/* <a href="#" style= {{outline: 'none', textDecoration :'none'}}className={classes.next && classes.round}>{!type==='prev'?'>' : '<'} </a> */}
        
       
        </button></div>}



        const pages = Math.ceil(this.numResults / this.resPerPage);
        let button;
        let secondButton;
        if (Number(this.props.page) === 1 && pages > 1) {
            // Only button to go to next this.props.page
            button = createButton(Number(this.props.page), 'next');
        } else if (Number(this.props.page) < pages) {
            // Both buttons
            button = createButton(Number(this.props.page), 'prev');
            secondButton =createButton(Number(this.props.page), 'next');
             } 
             else if (Number(this.props.page) === pages && pages > 1) {
            // Only button to go to prev this.props.page
            button = createButton(Number(this.props.page), 'prev');
        }
        
        
        
    

        return (
            <div className={classes.pagbutton}>
               {button}
                {/* <p>{this.props.page}</p> */}
                {secondButton}  
            </div>
        )
    }
}










 {/* data-goto=${type === 'prev' ? this.props.page - 1 : this.props.page + 1}>
             <span>this.props.page ${type === 'prev' ? this.props.page - 1 : this.props.page + 1}</span>
             <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
             </svg> */}