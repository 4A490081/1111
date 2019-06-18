import React, { Component } from 'react'
import { render } from 'react-dom'
import { Redirect } from 'react-router'
import { HashRouter, Route, Link } from 'react-router-dom'
import './app.css'

class End extends React.Component {
  constructor(props) {
    super(props);
   
  }

  render() {
    return (
      
      
      <iframe src='/end' scrolling='no' height='100%' width='100%' frameBorder='0px'></iframe>
    );
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }
  
  handleSubmit(e) {
    e.preventDefault();
  }
}

export {End}
