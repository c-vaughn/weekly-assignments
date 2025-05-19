import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

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
      </Routes>
      </div>
    );
  }
}

export default App;
