import React from "react";
import heroImage from '../header.jpg';

const Header = (props) => {
  return (
    <header className="hero">
      <div className="hero-body">
        <div className="container">
      <img src={heroImage} className="App-logo" alt="logo" />
      <h1 className="title">Welcome to Golf Journal</h1>
        </div>
        </div>
    </header>
  );
};

export default Header;