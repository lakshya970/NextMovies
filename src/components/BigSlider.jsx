import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import "swiper/css";
import Progress from "./Progress";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const imgURL = "https://image.tmdb.org/t/p/original";

const BigSlider = ({ type, query }) => {
  const fetchData = async () => {
    const res = await axios.get(`
    https://api.themoviedb.org/3/trending/${type}/day?api_key=029484b23960c56df6f1d7896bf21408&language=en-US&page=1
    `);

    return res.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: [query],
    queryFn: fetchData,
  });

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <Swiper
          slidesPerView={1}
          effect="fade"
          autoplay={{ delay: 5000 }}
          loop={true}
          modules={[Autoplay, EffectFade]}
        >
          {data.results.map((value, index) => (
            <SwiperSlide key={value.id}>
              <div
                className={`text-white bg-cover py-16 md:py-24 px-4 md:px-8 relative space-y-4 bg-center object-cover h-[80vh] md:h-[90vh]`}
                style={{
                  backgroundImage: `url(${imgURL}${value.backdrop_path})`,
                }}
              >
                <div className="inset-0 bg-black/50 absolute"></div>
                <h1 className="text-white truncate isolate font-bold text-xl md:text-2xl">
                  Trending #{index + 1}
                </h1>
                <h1 className="text-3xl font-bold md:text-5xl truncate isolate h-[55px]">
                  {value.title || value.name}
                </h1>
                <h1 className=" isolate">
                  {value.release_date || value.first_air_date}{" "}
                  <span className=" uppercase font-bold text-[14px] px-2 py-1 ml-3 border-[1px] border-slate-200 rounded-md truncate isolate">
                    {value.media_type}
                  </span>
                </h1>
                <Progress rating={value.vote_average} />
                {/* <div className="radial-progress isolate font-semibold dark:bg-gray-100 bg-gray-900 text-black">
                {value.vote_average}
              </div> */}

                <button className="truncate isolate bg-slate-400 bg-opacity-30 px-2 py-2 rounded-md text-sm font-bold">
                  <Link to={`/${value.media_type}/details/${value.id}`}>
                    Show Details
                  </Link>
                </button>
                <p className=" text-wrap md:w-[50%] truncate isolate line-clamp-3 ">
                  {value.overview}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default BigSlider;
