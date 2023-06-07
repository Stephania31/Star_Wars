export const swStore = {
  favoritosStore: [
    { uid: "probando", name: "test1" },
    { uid: "probando2", name: "test2" },
  ],
  initialFetch: [],
};

export function swActions(getStore, getActions, setStore) {
  return {
    addFavorite: (item) => {
      let store = getStore();
      const favoritosStore = store.favoritosStore || []; // Agrega esta línea para verificar si favoritosStore es undefined y asignar un array vacío en su lugar
      const nameExists = favoritosStore.some(
        (favorite) => favorite.name === item.name
      );
      if (nameExists) {
        alert(`"${item.name}" already exists in favorites.`);
        return;
      }
      const updatedFavorites = [...favoritosStore, item];
      setStore({ favoritosStore: updatedFavorites });

      return;
    },
    removeFavorite: (i) => {
      let store = getStore();
      let arrTemp = store.favoritosStore.filter((item, index) => {
        return index != i;
      });
      setStore({ ...store, favoritosStore: arrTemp });

      return;
    },
    initialFetchSwapi: async () => {
      try {
        let store = getStore();
        let responsePeople = fetch("https://www.swapi.tech/api/people");
        let responseVehicles = fetch("https://www.swapi.tech/api/vehicles");
        let responsePlanets = fetch("https://www.swapi.tech/api/planets");

        let [respuestaJsonPeople, respuestaJsonVehicles, respuestaJsonPlanets] =
          await Promise.all([
            responsePeople,
            responseVehicles,
            responsePlanets,
          ]).then((responses) =>
            Promise.all(responses.map((response) => response.json()))
          );

        console.log(respuestaJsonPeople);
        console.log(respuestaJsonVehicles);
        console.log(respuestaJsonPlanets);

        setStore({
          ...store,
          initialFetch: [
            respuestaJsonPeople.results,
            respuestaJsonVehicles.results,
            respuestaJsonPlanets.results,
          ],
        });
      } catch (error) {
        console.error(error);
      }
    },
  };
}
