export const favoritesStore = {
  favorites: [],
};

export function favoritesActions(getStore, getActions, setStore) {
  return {
    addFavorite: async (objeto) => {
      try {
        let store = getStore();
        let arrTemp = store.favorites.slice();

        if (arrTemp.some((item) => item.name === objeto.name)) {
          return;
        }

        arrTemp.push(objeto);
        setStore({ ...store, favorites: arrTemp });
        return true;
      } catch (error) {
        console.error("Error adding favorite:", error);
      }
    },

    deleteFavorite: async (uid) => {
      try {
        let store = getStore();
        let arrTemp = store.favorites.slice();
        const index = arrTemp.findIndex((item) => item.uid === uid);

        if (index === -1) {
          return;
        }

        arrTemp.splice(index, 1);
        setStore({ ...store, favorites: arrTemp });
        return true;
      } catch (error) {
        console.error("Error deleting favorite:", error);
      }
    },
  };
}
