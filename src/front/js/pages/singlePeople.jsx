import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import FotoGrande from "../../img/fotoGrande.jpg";

const SinglePeople = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const [people, setPeople] = useState({});

  useEffect(() => {
    const cargaDatos = async () => {
      let { respuestaJson, response } = await actions.useFetch(
        `/people/${params.uid}`
      );
      if (response.ok) {
        console.log(respuestaJson);
        setPeople(respuestaJson.result.properties);
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
              src={`https://starwars-visualguide.com/assets/img/characters/${params.uid}.jpg`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://starwars-visualguide.com/assets/img/big-placeholder.jpg";
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
                {people && people.name ? people.name : "Loading..."}
              </h5>
              <p className="card-text">
                Gender: {people?.gender} <br /> Height:{people?.height} <br />{" "}
                Mass:{people?.mass}
                <br /> Hair Color:{people?.hair_color}
                <br />
                Birth Year:{people?.birth_year}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePeople;
