import React from "react";
import heroImage from '../header.jpg';

const Header = (props) => {
  return (
    <header className="App-header">
      <img src={heroImage} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to Golf Journal</h1>
    </header>
  );
};

export default Header;