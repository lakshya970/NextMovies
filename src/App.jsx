import React from "react";
import { Routes, Route } from "react-router-dom";
import Search from "./pages/Search";
import Layout from "./pages/Layout";
import Movies from "./pages/Movies";
import TvShows from "./pages/TvShows";
import Home from "./pages/Home";
import Genre from "./pages/Genre";
import GenreGrid from "./pages/GenreGrid";
import MovieDetails from "./pages/MovieDetails";
import TvDetails from "./pages/TvDetails";
import NotFound from "./pages/NotFound";
import UniversalGrid from "./pages/UniversalGrid";
import Trending from "./pages/Trending";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/search/:query" element={<Search />} />
        <Route path="/movie" element={<Movies />} />
        <Route path="/tv" element={<TvShows />} />
        <Route path="/:type/:category" element={<UniversalGrid />} />
        <Route path="/genres" element={<Genre />} />
        <Route path="/:type/genres" element={<Genre />} />
        <Route path="/:type/genres/:genre" element={<GenreGrid />} />
        <Route path="/movie/details/:id" element={<MovieDetails />} />
        <Route path="/tv/details/:id" element={<TvDetails />} />
        <Route path="/:type/trending" element={<Trending />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
