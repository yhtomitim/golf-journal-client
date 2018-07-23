import React from "react";
import heroImage from '../header.jpg';
import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <header className="App-header">
      <img src={heroImage} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to Golf Journal</h1>
      <Link to="/demo">Demo</Link> <br/>
      <Link to="/">Home</Link> <br/>
      <Link to="/login">Try It Out</Link>
    </header>
  );
};

export default Header;