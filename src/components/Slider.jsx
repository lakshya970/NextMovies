import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "./Card";
import "swiper/css";
import { BsArrowRightShort } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";
import Heading from "./Heading";
import { api_key, api_url } from "../constants";
import { movieSliderConfig } from "../config/swiper.config";

const Slider = ({ type, category, title }) => {
  // console.log(type, category, title);
  const fetchMovies = async () => {
    const res = await axios.get(
      `${api_url}/${type}/${category}?api_key=${api_key}&language=en-US&page=1`
    );
    return res.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: [`${title} slides`],
    queryFn: fetchMovies,
  });

  // console.log(data);

  return (
    <div className="space-y-4 px-4 mt-5">
      <div className="flex justify-between items-end">
        <div className="">
          {/* <h1 className="text-xl font-semibold text-center md:text-2xl ">
            Popular Movies
          </h1> */}{" "}
          <Heading text={title} />
        </div>

        <Link
          to={`/${type}/${category}`}
          className=" capitalize font-semibold flex items-center gap-2 hover:translate-x-1 transition-all duration-200 hover:text-green-400"
        >
          <span className="hidden md:block">show more</span>

          <BsArrowRightShort size={30} className="" />
        </Link>
      </div>
      {isLoading ? (
        <LoadingSlide />
      ) : (
        <Swiper {...movieSliderConfig}>
          {data &&
            data.results.map((value) => (
              <SwiperSlide key={value.id} className="">
                <Link to={`/${type}/details/${value.id}`}>
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

export default Slider;

const LoadingSlide = () => {
  return (
    <div>
      <Swiper {...movieSliderConfig}>
        {Array(20)
          .fill()
          .map((value, i) => (
            <SwiperSlide key={i}>
              <div className="hidden dark:block">
                <Skeleton
                  baseColor="#1e293b"
                  highlightColor="#475569"
                  className="h-auto w-full rounded-xl aspect-[4/6]"
                />
              </div>
              <div className="dark:hidden block">
                <Skeleton
                  baseColor="#E2E8F0"
                  highlightColor="#F1F5F9"
                  className="h-auto w-full rounded-xl aspect-[4/6]"
                />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export { LoadingSlide };
