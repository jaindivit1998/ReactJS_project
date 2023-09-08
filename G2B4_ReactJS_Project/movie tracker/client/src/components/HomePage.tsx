import React from "react";
import { Link, useLocation } from "react-router-dom";


const HomePage: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <header className="App-header">
        <h1>Movies On Tip</h1>
      </header>
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/movie-list/movies-coming" className={location.pathname.includes("/movie-list/movies-coming") ? "active" : ""}>
              Coming Soon
            </Link>
          </li>
          <li>
            <Link to="/movie-list/movies-in-theaters" className={location.pathname.includes("/movie-list/movies-in-theaters") ? "active" : ""}>
              Movies in Theaters
            </Link>
          </li>
          <li>
            <Link to="/movie-list/top-rated-india" className={location.pathname.includes("/movie-list/top-rated-india") ? "active" : ""}>
              Top Rated Indian
            </Link>
          </li>
          <li>
            <Link to="/movie-list/top-rated-movies" className={location.pathname.includes("/movie-list/top-rated-movies") ? "active" : ""}>
              Top Rated Movies
            </Link>
          </li>
          <li>
            <Link to="/movie-list/favourite" className={location.pathname.includes("/movie-list/favourite") ? "active" : ""}>
              Favorites
            </Link>
          </li>
          
        </ul>
      </nav>
    </>
  );
};

export default HomePage;
