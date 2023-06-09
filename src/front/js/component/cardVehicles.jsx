import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import FotoChica from "../../img/fotoChica.png";

const CardVehicles = (props) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { actions } = useContext(Context);

  const addToFavorites = () => {
    actions.addFavorite(props.item);
    setIsFavorite(true);
  };

  return (
    <div>
      <div className="card" style={{ width: "18rem" }}>
        <img
          src={`https://starwars-visualguide.com/assets/img/vehicles/${props.uid}.jpg`}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <Link
            to={`/vehicles/${props.uid}`}
            className="btn btn-outline-primary me-5 "
          >
            Learn More!
          </Link>
          <button
            className="btn btn-outline-warning ms-5"
            id="heart"
            onClick={() => {
              actions.addFavorite({
                name: props.name,
                uid: props.uid,
                category: "vehicles",
                link: `/vehicles/${props.uid}`,
              });
            }}
          >
            <i className="far fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardVehicles;
