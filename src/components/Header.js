import React from "react";
import logo from '../logo.svg';

const Header = (props) => {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
      <nav className="Navigation"></nav>
    </header>
  );
};

export default Header;