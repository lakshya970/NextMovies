import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { imgUrlSm } from "../constants";
import { Mousewheel } from "swiper/modules";
import fallback from "../assets/fallback.svg";
import Heading from "./Heading";

const CastSlide = ({ cast }) => {
  return (
    <div className="w-full px-4 space-y-6">
      <Heading text="Top Cast" />
      <Swiper
        className="w-full"
        spaceBetween={16}
        slidesPerView={2}
        modules={[Mousewheel]}
        breakpoints={{
          600: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 16,
          },
          600: {
            slidesPerView: 4,
            spaceBetween: 16,
          },
        }}
      >
        {cast.map((value, index) => (
          <SwiperSlide
            key={index}
            className="flex flex-col items-center space-y-1"
          >
            <img
              src={
                value.profile_path ? imgUrlSm + value.profile_path : fallback
              }
              alt=""
              className=" aspect-square object-cover object-center rounded-full w-[180px]"
            />
            <div className="text-center">{value.name}</div>
            <div className="text-sm text-center dark:text-white/80 text-slate-900/80">
              {value.character}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CastSlide;
