import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import CardPeople from "../component/cardPeople.jsx";
import CardPlanet from "../component/cardPlanet.jsx";
import CardVehicles from "../component/cardVehicles.jsx";

import { todoActions } from "../store/todos";

const StarWars = () => {
  const { store, actions } = useContext(Context);
  const [listPeople, setListPeople] = useState([1, 2, 3, 4, 5, 6]);
  const [listVehicles, setListVehicles] = useState({});
  const [listPlanets, setListPlanets] = useState({});

  //se ejecuta la primera vez que se reenderiza el componente
  useEffect(() => {
    const cargaDatos = async () => {
      let { respuestaJson, response } = await actions.useFetch("/people");
      if (response.ok) {
        console.log(respuestaJson);
        setListPeople(respuestaJson.results);
      }
      ({ respuestaJson, response } = await actions.useFetch("/planets"));
      if (response.ok) {
        console.log(respuestaJson);
        setListPlanets(respuestaJson.results);
      }
      ({ respuestaJson, response } = await actions.useFetch("/vehicles"));
      if (response.ok) {
        console.log(respuestaJson);
        setListVehicles(respuestaJson.results);
      }
    };
    cargaDatos();
  }, []);

  const cargaParalelo = async () => {
    let promesaPlanetas = actions.useFetchParalelo("/planets");
    let promesaPeople = actions.useFetchParalelo("/people");
    let promesaVehicles = actions.useFetchParalelo("/vehicles");

    let [a, b, c] = await Promise.all([
      promesaPlanetas,
      promesaPeople,
      promesaVehicles,
    ]);

    a = await a.json();
    setListPlanets(a.results);

    b = await b.json();
    setListPeople(b.results);

    c = await c.json();
    setListVehicles(c.results);
  };
  cargaParalelo();
  useEffect(() => {}, [listPeople]);
  useEffect(() => {}, [listPlanets]);
  useEffect(() => {}, [listVehicles]);

  return (
    <>
      <div className="fondo bg-dark bg-gradient">
        <h2 className="characters border-bottom text-danger"> Characters</h2>

        <div className="container-fluid">
          <div className="row">
            {listPeople && listPeople.length > 0 ? (
              <>
                {listPeople.map((item, index) => {
                  return (
                    <div className="col-md-3" key={item.uid}>
                      <CardPeople name={item.name} uid={item.uid} />
                    </div>
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className="fondo bg-dark bg-gradient">
        <h2 className="characters border-bottom text-danger"> Planets</h2>

        <div className="container-fluid">
          <div className="row">
            {listPlanets && listPlanets.length > 0 ? (
              <>
                {listPlanets.map((item, index) => {
                  return (
                    <div className="col-md-3" key={item.uid}>
                      <CardPlanet name={item.name} uid={item.uid} />
                    </div>
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      <div className="fondo bg-dark bg-gradient">
        <h2 className="characters border-bottom text-danger"> Vehicles</h2>

        <div className="container-fluid">
          <div className="row">
            {listVehicles && listVehicles.length > 0 ? (
              <>
                {listVehicles.map((item, index) => {
                  return (
                    <div className="col-md-3" key={item.uid}>
                      <CardVehicles name={item.name} uid={item.uid} />
                    </div>
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StarWars;
