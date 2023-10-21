import { useLocalStorage } from "./useLocalStorage";

export const useFavorites = () => {
  const [favorites, setFavorites] = useLocalStorage("favorites", []);

  const addFavorite = (favorite: string) => {
    const newFavorites = Array.from(new Set([...favorites, favorite]));
    setFavorites(newFavorites);
  };

  const removeFavorite = (favorite: string) => {
    const newFavorites = favorites.filter((fav: string) => fav !== favorite);
    setFavorites(newFavorites);
  };

  return { favorites, addFavorite, removeFavorite };
};
