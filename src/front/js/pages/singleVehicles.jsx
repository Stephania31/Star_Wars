import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import FotoGrande from "../../img/fotoGrande.jpg";

const SingleVehicles = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const [vehicles, setVehicles] = useState({});

  useEffect(() => {
    const cargaDatos = async () => {
      let { respuestaJson, response } = await actions.useFetch(
        `/vehicles/${params.uid}`
      );
      if (response.ok) {
        console.log(respuestaJson);
        setVehicles(respuestaJson.result.properties);
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
              src={FotoGrande}
              className="img-fluid rounded-start"
              alt="..."
            />
            <div
              className="single-table border-top border-danger"
              style={{ width: "50rem" }}
            >
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th></th>
                    <th className="text-danger">Name</th>
                    <th className="text-danger">Birth Year</th>
                    <th className="text-danger">Gender</th>
                    <th className="text-danger">Height</th>
                    <th className="text-danger">Skin Color</th>
                    <th className="text-danger">Eye Color</th>
                  </tr>
                </thead>
                <tbody>{/* Agregue aquí los datos de la tabla */}</tbody>
              </table>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">
                {vehicles && vehicles.name ? vehicles.name : "Loading"}
              </h5>
              <p className="card-text">
                {vehicles ? `/vehicles/${params.uid}` : "Loading..."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleVehicles;
