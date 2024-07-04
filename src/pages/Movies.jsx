import React from "react";
import BigSlider from "../components/BigSlider";
import Slider from "../components/Slider";
import TrendingSlider from "../components/TrendingSlider";

const Movies = () => {
  return (
    <div className="space-y-8 pb-8">
      {/* Big Slider */}
      <BigSlider type="movie" query="trending movies big" />
      <Slider title="popular movies" type="movie" category="popular" />
      <Slider title="now playing movies" type="movie" category="now_playing" />
      <Slider title="upcoming movies" type="movie" category="upcoming" />
      <Slider title="top rated movies" type="movie" category="top_rated" />
      <TrendingSlider title={"trending movies"} type={"movie"} />
    </div>
  );
};

export default Movies;
