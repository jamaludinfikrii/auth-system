import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from './component/Header';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Todos from './pages/Todos';
import VerificationSuccess from './pages/VerificationSuccesPage';

export class App extends Component {
  render() {
    return (
      <div className='container'>
        <Router>
          <Header />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/register' component={RegisterPage} />
            <Route path='/login' component={LoginPage} />
            <Route path='/verification/:id/:password' component={VerificationSuccess} />
            <Route path='/todo' component={Todos} />
          </Switch>
        </Router>
      </div>
      
     
    )
  }
}

export default App

