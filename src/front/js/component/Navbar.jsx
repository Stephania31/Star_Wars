import React, { useState, useEffect, useContext, useRef } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import SwLogo from "../../img/swLogo.jpg";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  const handleDelete = (itemIndex) => {
    actions.deleteFavorite(itemIndex);
  };

  return (
    <nav className="navbar navbar-light bg-dark bg-gradient bg-opacity-75">
      <div className="container ms-3">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">
            <img
              className="logo"
              style={{
                width: "10rem",
              }}
              src={SwLogo}
              alt="Star Wars"
            />
          </span>
        </Link>
        <div className="nav-item dropdown btn btn-danger">
          <div
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Favorites
          </div>
          <ul
            className="dropdown-menu list-unstyled"
            aria-labelledby="navbarDropdown"
          >
            {store.favoritosStore && store.favoritosStore.length > 0 ? (
              <>
                {store.favoritosStore.map((item, index) => {
                  return (
                    <>
                      <React.Fragment key={index}>
                        <Link to={item.link} className="text-left">
                          <li className="d-flex align-items-center">
                            {item.name}
                          </li>
                        </Link>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(index)}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </React.Fragment>
                    </>
                  );
                })}
              </>
            ) : (
              <>No favorites yet</>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
