import React from "react";
import heroImage from '../header.jpg';

const Header = () => {
  return (
    <header className="hero">
      <div className="hero-body">
        <img src={heroImage} className="image" alt="golf hole by a pond" />
        <h1 className="title ">Golf Journal</h1>
      </div>
    </header>
  );
};

export default Header;