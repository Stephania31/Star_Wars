import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import FotoGrande from "../../img/fotoGrande.jpg";

const SinglePlanet = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const [planet, setPlanet] = useState({});

  useEffect(() => {
    const cargaDatos = async () => {
      let { respuestaJson, response } = await actions.useFetch(
        `/planets/${params.uid}`
      );
      if (response.ok) {
        console.log(respuestaJson);
        setPlanet(respuestaJson.result.properties);
      }
    };
    cargaDatos();
  }, []);

  return (
    <>
      <div className="single card mb-3 border-0" style={{ width: "60rem" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={`https://starwars-visualguide.com/assets/img/planets/${params.uid}.jpg`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://upload.wikimedia.org/wikipedia/en/6/6d/Tatooine_%28fictional_desert_planet%29.jpg";
              }}
              className="img-fluid rounded-start"
              alt="..."
            />
            <div
              className="single-table border-top border-danger"
              style={{ width: "50rem" }}
            ></div>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">
                {planet && planet.name ? planet.name : "Loading..."}
              </h5>
              <p className="card-text">
                Climate: {planet.climate} <br />
                Diameter: {planet.diameter} <br />
                Gravity: {planet.gravity} <br />
                Orbital Period: {planet.orbital_period} <br />
                Population: {planet.population} <br />
                Terrain: {planet.terrain}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePlanet;
