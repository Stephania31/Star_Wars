import React from "react";
import { Link } from "react-router-dom";
import SwLogo from "../../img/swLogo.jpg";

export const Navbar = () => {
  //<a href="./demo.html">

  return (
    <nav className="navbar navbar-light bg-dark bg-gradient bg-opacity-75">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand  mb-0 h1">
            {" "}
            <img
              className="logo"
              style={{
                width: "10rem",
              }}
              src={SwLogo}
              alt="Star Wars"
            />{" "}
          </span>{" "}
        </Link>{" "}
        <div className="ml-auto">
          <Link calssName="nav-item dropdown" to="/demo">
            <button className="btn btn-primary dropdown-toggle btn-lg">
              {" "}
              Favorites{" "}
            </button>{" "}
            <ul className="dropdown-menu"> </ul>{" "}
          </Link>{" "}
        </div>{" "}
      </div>{" "}
    </nav>
  );
};
