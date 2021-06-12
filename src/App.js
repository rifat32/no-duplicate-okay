import React, { Component } from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import {DuplicateConsumer} from './context'
import CreateDuplicatePage from './pages/CreateDuplicatePage';
import AllDuplicatesPage from './pages/AllDuplicatesPage';

export default class App extends Component {
  render() {
    return (
      <DuplicateConsumer>
        {
        value => {
 const {login,logout} = value
          return (
            <Router>
             {login && (  <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container">
    <NavLink className="navbar-brand" to="/">No Duplicate</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName='active' to="/create-duplicate">Create Duplicate</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName='active' to="/all-duplicates">All Duplicates</NavLink>
        </li>
        <li className="nav-item ms-2">
          <button type='button' onClick={logout}  className="btn">Logout</button>
        </li>
      </ul>
     
    </div>
  </div>
</nav>)}
        
         <Switch>
          <Route exact path="/">
          {
                login ? <HomePage />: <AuthPage/>
              }
           
          </Route>
          <Route  path="/create-duplicate">
          {
                login ? <CreateDuplicatePage />: <AuthPage/>
              }
           
          </Route>
          <Route  path="/all-duplicates">
          {
                login ? <AllDuplicatesPage />: <AuthPage/>
              }
           
          </Route>
         
          
        </Switch>
        
      </Router>
          )
        }
        }
 
      </DuplicateConsumer>
     
    )
  }
}
