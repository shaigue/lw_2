import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem} from "react-bootstrap";
import Routes from "./Routes";
import './App.css';
import { LinkContainer } from "react-router-bootstrap";





class App extends Component {

  render() {
    return (
      <div className="App container">
        <Routes />
      </div>
    );
  }
}

export default App;
