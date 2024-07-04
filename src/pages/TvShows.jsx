import React from "react";
import BigSlider from "../components/BigSlider";
import Slider from "../components/Slider";
import TrendingSlider from "../components/TrendingSlider";

const TvShows = () => {
  return (
    <div className="space-y-8 pb-8">
      <BigSlider type="tv" query="trending show big" />
      {/* popular tv shows  */}
      <Slider title="popular tv show" type="tv" category="popular" />
      <Slider title="airing today" type="tv" category="airing_today" />
      <Slider title="on the air" type="tv" category="on_the_air" />
      <Slider title="top rated shows" type="tv" category="top_rated" />
      <TrendingSlider title={"trending tv shows"} type="tv" />
    </div>
  );
};

export default TvShows;
