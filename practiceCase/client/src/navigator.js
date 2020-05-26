import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from './pages/login'
import Home from './pages/home'
import Users from './pages/users'
import Book from './pages/book';
import Preload from './pages/preload';
import Loans from './pages/loans';
import Profile from './pages/profile';

const PrivateRoute = ({ children, ...rest })  => {
    const { user } = useSelector(state => state)    
    return (
      <Route
        {...rest}
        render={({ location }) =>
            user.isAuthenticated   ? (
            children
          ) : (
            <Preload location={location} />            
          )
        }
      />
    );
  }

  const Navigator = () => {
    
    return (      
        <Router>
          <Switch>
            <PrivateRoute path="/home/:id">
              <Book />
            </PrivateRoute>
            <PrivateRoute path="/home">
              <Home />
            </PrivateRoute>   
            <PrivateRoute path="/loans">
              <Loans />
            </PrivateRoute>           
            <PrivateRoute path="/users">
              <Users />
            </PrivateRoute>
            <PrivateRoute path="/profile">
              <Profile />
            </PrivateRoute>
            <Route path="/">
              <Login />
            </Route>
          </Switch>      
        </Router>       
    );
  }
  
  export default Navigator;