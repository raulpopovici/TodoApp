import React from 'react'
import { Fragment } from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import axios from 'axios';


import Input from "./components/input"
import Login from "./components/login"

axios.defaults.baseURL = "http://localhost:5000/api";
axios.defaults.withCredentials = true;


function App() {
  return (

    <Router>

    <Fragment>

    <div className="container">

      
      <Route exact path = "/" component = {Input}/>

      <Route exact path = "/login" component = {Login}/>


    </div>

    </Fragment>

    </Router>
    

  )
    
  
}

export default App;
