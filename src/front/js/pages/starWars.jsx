import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import CardPeople from "../component/cardPeople.jsx";
import { todoActions } from "../store/todos";

const StarWars = () => {
  const { store, actions } = useContext(Context);
  const [listPeople, setListPeople] = useState([1, 2, 3, 4]);

  //se ejecuta la primera vez que se reenderiza el componente
  useEffect(() => {
    const cargaDatos = async () => {
      let { respuestaJson, response } = await actions.useFetch("/people");
      if (response.ok) {
        console.log(respuestaJson);
        setListPeople(respuestaJson.results);
      }
    };
    cargaDatos();
  }, []);

  return (
    <>
      <h2 className="text-danger"> Characters</h2>

      <div className="container-fluid">
        <div className="row">
          {listPeople && listPeople.length > 0 ? (
            <>
              {listPeople.map((item, index) => {
                return (
                  <div className="col-md-4" key={item.uid}>
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
    </>
  );
};

export default StarWars;
