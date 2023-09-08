import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import HomePage from "./HomePage";
import {
  addMovieToFavourite,
  getItemsData,
  removeMovieFromFavourite,
} from "../services/ItemServices";
import IDataList from "../model/IDataList";

const MovieListPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();

  const [items, setItems] = useState<IDataList[]>([]);
  const [favorite, setFav] = useState<IDataList[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchItemsData = async () => {
      try {
        const fav = await getItemsData("favourite");
        setFav(fav);
        const data = await getItemsData(category);
        setItems(data);
      } catch (error) {
        console.error(error);
        setError(error as Error);
      }
    };
    fetchItemsData();
  }, [category]);

  function isMovieFavorite(movie: IDataList) {
    return favorite.some((value) => value.id === movie.id);
  }

  function handleAddToFavorites(movie: IDataList): void {
    if (isMovieFavorite(movie)) {
      const deleteFav = async () => {
        try {
          const fav = await removeMovieFromFavourite("favourite", movie.id);
          setFav((prevFavorites) =>
            prevFavorites.filter((item) => item.id !== movie.id)
          );
        } catch (error) {
          console.error(error);
          setError(error as Error);
        }
      };
      deleteFav();
    } else {
      const addFav = async () => {
        try {
          const fav = await addMovieToFavourite("favourite", movie);
          setFav((prevFavorites) => [...prevFavorites, fav]);
        } catch (error) {
          console.error(error);
          setError(error as Error);
        }
      };
      addFav();
      isMovieFavorite(movie);
    }
  }

  const filteredItems = items.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const getAverageRating = (ratings: number[]): string => {
    if (ratings.length === 0) {
      return "NA";
    }

    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
    const average = sum / ratings.length;
    return average.toFixed(1);
  };

  return (
    <div>
      <HomePage />
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search movies"
        />
      </div>
      <div className="movie-list">
        {filteredItems.map((movie, index) => (
          <div className="movie-box" key={movie.id}>
            <Link className ="posterLink" to={`/movies/${category}/${movie.id}`}>
              {/*  can use this, if img not present in public folder */}
              <img
                className="poster"
                src={ movie.posterurl}
                alt={movie.title}
              />
              {/*  can use this, if images present in public folder */}
              {/* <img className="poster" src={'/img/' + movie.poster} alt={movie.title} /> */}
              <h3 className="title">{movie.title}</h3>
            </Link>
            <div className="rating-favorites">
              <p className="rating">
                <span className="star-icon">&#9733;</span>{" "}
                {getAverageRating(movie.ratings)}
              </p>
              <button
                className={`favorite-button ${
                  isMovieFavorite(movie) ? "favorite" : ""
                }`}
                onClick={() => handleAddToFavorites(movie)}
              >
                {isMovieFavorite(movie) ? "❤️" : "♡"}
              </button>
            </div>
          </div>
        ))}
      </div>
      {error && <>{error?.message}</>}
    </div>
  );
};

export default MovieListPage;
