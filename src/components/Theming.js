import React, { Component } from 'react'
import classes from './spinner.module.css'

export default class Theming extends Component {
    state = {
        dark: true
      };

      themeState=()=>{
          this.setState({dark:!this.state.dark})
      }

    render() {
    //   const themeLight = {
    //         background: gray,
    //         body: black
    //       };
          
    //     const themeDark = {
    //         background: black,
    //         body: white
    //       };

        return (
            <div className = {classes.Wrapper } 
            style={{backgroundColor : this.state.dark? 'white':'rgb(0,0,0,0.3)',
            paddingTop : '4%', paddingLeft:'1%',
            body : this.state.dark? 'black':'white'}}>
        <button  className ={classes.Button_Theme} onClick={() => this.themeState()}>
          {!this.state.dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      {this.props.children}
            </div>
        )
    }
}
