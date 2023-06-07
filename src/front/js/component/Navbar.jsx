import React, { useState, useEffect, useContext, useRef } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import SwLogo from "../../img/swLogo.jpg";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [favorites, setFavorites] = useState(store.favoritosStore);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setFavorites(store.favoritosStore);
  }, [store.favoritosStore]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        dropdownRef.current.contains(event.target) &&
        dropdownRef.current.querySelector(".dropdown-menu")
      ) {
        const dropdownMenu =
          dropdownRef.current.querySelector(".dropdown-menu");
        dropdownMenu.classList.remove("show");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
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
            style={{
              fontWeight: "bold",
              fontSize: "1.2rem",
            }}
          >
            Favorites {store.favoritosStore?.length ?? 0}
          </button>
          <ul className="dropdown-menu" ref={dropdownRef}>
            {favorites && favorites.length > 0 ? (
              <>
                {favorites.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className="dropdown-item d-flex justify-content-between align-items-center"
                    >
                      <Link
                        to={(item?.url ?? "") + (item?.uid ?? "")}
                        className="item-name"
                      >
                        <span className="item-name">
                          {item?.name ?? "Unknown"}
                        </span>
                      </Link>
                      <i
                        className="btn fa-solid fa-trash-can fa-lg"
                        onClick={() => {
                          actions.removeFavorite(index);
                        }}
                      ></i>
                    </li>
                  );
                })}
              </>
            ) : (
              <>It is empty</>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
