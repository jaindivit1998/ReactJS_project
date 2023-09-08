import React from "react";
import "./App.css";
import Home from "./components/HomePage";
import MovieListPage from "./components/MovieListPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";

function App() {
  return (
    <div className="App">
     <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
        <Routes>
          <Route
            path="/movie-list/:category"
            element={<MovieListPage />}
          ></Route>
          <Route path="/movies/:category/:movieId" element={<MovieDetails/>} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
