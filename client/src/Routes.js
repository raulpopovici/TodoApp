import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

export const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/register' component={Register}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/' component={Home}/>
            </Switch>
        </Router>        
    )
}

export default Routes