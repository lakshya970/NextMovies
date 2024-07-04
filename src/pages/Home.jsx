import React from "react";
import BigSlider from "../components/BigSlider";
import Slider from "../components/Slider";
import TrendingSlider from "../components/TrendingSlider";

const Home = () => {
  return (
    <div className="space-y-8 pb-8">
      <BigSlider type="all" query="trending" />
      <Slider title={"popular movies"} type="movie" category="popular" />
      <Slider title={"popular tv shows"} type="tv" category="popular" />
      <Slider title={"top rated movies"} type="movie" category="top_rated" />
      <Slider title={"top rated tv shows"} type="tv" category="top_rated" />
      <TrendingSlider title={"trending movies"} type={"movie"} />
      <TrendingSlider title={"trending tv shows"} type={"tv"} />
    </div>
  );
};

export default Home;
