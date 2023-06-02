import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import SwLogo from "../../img/swLogo.jpg";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  return (
    <nav className="navbar navbar-light bg-dark bg-gradient bg-opacity-75">
      <div className="container">
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
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-danger dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Favorites {store.favorites?.length ?? 0}
          </button>
          <ul
            className="dropdown-menu list-unstyled"
            aria-labelledby="navbarDropdown"
          >
            {store.favorites && store.favorites.length > 0 ? (
              store.favorites.map((item, index) => (
                <li key={index}>
                  <Link to={item.link}>{item.name}</Link>
                  <p
                    className="ocultar"
                    type="button"
                    onClick={() => {
                      actions.deleteFavorite(item.uid);
                    }}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </p>
                </li>
              ))
            ) : (
              <li>
                <p className="dropdown-item">No favorites yet</p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
