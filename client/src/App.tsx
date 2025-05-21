import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import GoogleAuthLoader from './pages/GoogleAuthLoader';
import LinkedInAuthLoader from './pages/LinkedInAuthLoader';

class App extends Component {
  state = {message: ''};


  componentDidMount() {
    fetch('/')
      .then(res => res.text())
      .then(message => this.setState({message}))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <Routes>
        <Route path="/" element={ <Login/> } />
        <Route path="/dashboard" element={ <Dashboard/> } />
        <Route path="/googleAuthLoader" element={ <GoogleAuthLoader/> } />
        <Route path="/linkedInAuthLoader" element={ <LinkedInAuthLoader/> } />
      </Routes>
      </div>
    );
  }
}

export default App;
