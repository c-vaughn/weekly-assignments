import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>{this.state.message}</p>
        </header>
      </div>
    );
  }
}

export default App;
