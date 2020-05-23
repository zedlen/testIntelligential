import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from './pages/login'
import Home from './pages/home'
import Users from './pages/users'

const PrivateRoute = ({ children, ...rest })  => {
    const { user } = useSelector(state => state)
    return (
      <Route
        {...rest}
        render={({ location }) =>
            user.isAuthenticated  ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

  const Navigator = () => {
    
    return (      
        <Router>
          <Switch>
            <PrivateRoute path="/home">
              <Home />
            </PrivateRoute>
            <PrivateRoute path="/users">
              <Users />
            </PrivateRoute>
            <Route path="/">
              <Login />
            </Route>
          </Switch>      
        </Router>       
    );
  }
  
  export default Navigator;