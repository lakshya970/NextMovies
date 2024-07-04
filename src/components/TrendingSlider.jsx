import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "./Card";
import "swiper/css";
import { BsArrowRightShort } from "react-icons/bs";
import { LoadingSlide } from "./Slider";
import Heading from "./Heading";
import { movieSliderConfig } from "../config/swiper.config";
import { motion } from "framer-motion";
import Loading from "./Loading";

const TrendingSlider = ({ type, title }) => {
  console.log(type, title);
  const [isTodaySelected, setIsTodaySelected] = useState(true);

  const fetchMovies = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/${type}/${
        isTodaySelected ? "day" : "week"
      }?api_key=029484b23960c56df6f1d7896bf21408&language=en-US&page=1`
    );

    return response.data;
  };

  const { data, isLoading, refetch } = useQuery(
    [`${title} slides`],
    fetchMovies
  );

  useEffect(() => {
    refetch();
  }, [isTodaySelected]);

  return (
    <div className="px-4  space-y-4">
      <div className="flex justify-between items-end">
        {/* title */}
        <div className="">
          <Heading text={title} />
        </div>

        {/* link  */}
        <Link
          to={`/${type}/trending`}
          className=" capitalize font-medium hover:text-green-400 flex items-center gap-1 hover:translate-x-1 transition-all duration-200"
          onClick={() => window.scrollTo({ top: 0 })}
        >
          <span className="hidden md:block font-semibold">show more</span>
          <BsArrowRightShort
            className=" group-hover:translate-x-1 transition-all duration-200"
            size={30}
          />
        </Link>
      </div>

      {/* toggle day and week  */}
      <div className=" relative w-fit border border-black/20 dark:border-white/30 rounded-full p-1 my-2">
        <button
          className="py-2 px-5 font-semibold relative rounded-full overflow-hidden"
          onClick={() => setIsTodaySelected(true)}
        >
          {isTodaySelected && (
            <motion.div className=" bg-green-400 absolute inset-0"></motion.div>
          )}
          <span className=" isolate">Today</span>
        </button>
        <button
          className="py-2 px-5 font-semibold relative rounded-full overflow-hidden"
          onClick={() => setIsTodaySelected(false)}
        >
          {!isTodaySelected && (
            <motion.div className="bg-green-400 absolute inset-0"></motion.div>
          )}
          <span className=" isolate">Week</span>
        </button>
      </div>

      {isLoading ? (
        <LoadingSlide />
      ) : (
        <Swiper {...movieSliderConfig}>
          {data.results.map((value) => (
            <SwiperSlide key={value.id}>
              <Link key={value.id} to={`/${type}/details/${value.id}`}>
                <Card
                  title={value.title || value.name}
                  poster={value.poster_path}
                  rating={value.vote_average}
                  release={value.release_date || value.first_air_date}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default TrendingSlider;
