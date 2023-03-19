import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import FotoChica from "../../img/fotoChica.png";

const CardPeople = (props) => {
  return (
    <div>
      <div className="card" style={{ width: "18rem" }}>
        <img src={FotoChica} className="card-img-top" alt="una imagen" />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <Link
            to={`/people/${props.uid}`}
            className="btn btn-outline-primary me-5"
          >
            Learn More!
          </Link>
          <Link to={`/people/${props.uid}`} className="btn btn-outline-warning">
            <i className="far fa-heart"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardPeople;
