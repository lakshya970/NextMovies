import React, { useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { Navigation, Pagination } from "swiper/modules";
import CastSlide from "../components/CastSlide";
import Progress from "../components/Progress";
import {
  dateFormat,
  image_url,
  image_url_w500,
  imgUrl,
  imgUrlSm,
  toHoursAndMinutes,
} from "../constants";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Card from "../components/Card";
import Loading from "../components/Loading";
import { movieSliderConfig } from "../config/swiper.config";
import Iframe from "react-iframe";

import Heading from "../components/Heading";
const img_url = "https://image.tmdb.org/t/p/original";
const img_urlSM = "https://image.tmdb.org/t/p/w500";

const MovieSlide = ({ movies, title }) => {
  return (
    <div className=" space-y-4 px-4 md:px-4">
      <Heading text={title} />
      <Swiper {...movieSliderConfig}>
        {movies.map((value) => (
          <SwiperSlide key={value.id}>
            <Link key={value.id} to={`/movie/details/${value.id}`}>
              <Card
                title={value.title}
                poster={value.poster_path}
                rating={value.vote_average}
                release={value.release_date}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const MovieDetails = () => {
  const { id } = useParams();
  const fetchDetails = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=029484b23960c56df6f1d7896bf21408&append_to_response=images,videos,casts,similar_movies,recommendations`
    );

    return response.data;
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: [id],
    queryFn: fetchDetails,
  });

  console.log(data);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <section className="space-y-6 pb-6">
      <div
        className="flex py-12 md:py-20 px-4 md:px-12 flex-col md:flex-row items-center md:items-start bg-cover bg-center relative gap-8"
        style={{ backgroundImage: `url(${img_url + data.backdrop_path})` }}
      >
        <div className=" absolute inset-0 bg-black/50 top-0"></div>
        <img
          src={img_urlSM + data.poster_path}
          alt=""
          className="w-72 md:w-80 rounded-lg isolate"
        />
        <div className="flex flex-col items-center isolate md:items-start text-white">
          {/* title */}
          <h3 className="text-4xl font-bold mb-3 text-center md:text-start">
            {data.title}
          </h3>
          <span className="font-light mb-4">{data.tagline}</span>
          <div className="flex items-center gap-2 mb-4">
            <span className="">{dateFormat(data.release_date)}</span>
            <div className="w-[1px] h-5 bg-white/40"></div>
            <span>{toHoursAndMinutes(data.runtime)}</span>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <Progress
              size="3.25rem"
              thickness="4px"
              rating={data.vote_average}
              textSize="text-xl"
            />
            {data.vote_count != 0 && data.vote_average != 0 && (
              <div>({data.vote_count} votes)</div>
            )}
          </div>
          <div className="mb-4 flex flex-wrap gap-4 justify-center">
            {data.genres.map((value) => (
              <span className="py-1 px-2 rounded bg-white/20" key={value.id}>
                {value.name}
              </span>
            ))}
          </div>
          <p className=" font-light">{data.overview}</p>
        </div>
      </div>

      {/* cast slider  */}
      <CastSlide cast={data.casts.cast} />

      {/* videos  */}
      {data.videos.results.lenght !== 0 && (
        <div className="px-3 ">
          <Heading text={"videos"} />
          <div className="mt-3">
            <Swiper
              slidesPerView={1}
              pagination={{ dynamicBullets: true }}
              navigation={true}
              modules={[Pagination, Navigation]}
            >
              {data.videos.results.map((value) => (
                <SwiperSlide key={value.id}>
                  <Iframe
                    url={`http://www.youtube.com/embed/${value.key}`}
                    className="h-[300px] md:h-[100vh] w-full"
                  ></Iframe>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}

      {/* images logos  */}
      {data.images.logos.length !== 0 && (
        <ImageSlide images={data.images.logos} title="logos" />
      )}
      {/* posters */}
      {data.images.posters.lenght !== 0 && (
        <ImageSlide images={data.images.posters} title="posters" />
      )}
      {/* backdrops */}
      {data.images.backdrops.lenght !== 0 && (
        <div className="px-4 md:px-4 space-y-4">
          <Heading text={"backdrops"} />
          <Swiper
            className="pb-8"
            slidesPerView={1}
            breakpoints={{
              764: {
                slidesPerView: 2,
              },
            }}
            pagination={{ dynamicBullets: true }}
            navigation={true}
            // lazy={true}
            modules={[Navigation, Pagination]}
          >
            {data.images.backdrops.map((value, index) => (
              <SwiperSlide key={index}>
                <img
                  src={imgUrl + value.file_path}
                  className=" aspect-video h-auto w-full"
                  // loading="lazy"
                  alt=""
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      {/*similar movies */}
      {data.similar_movies.results.lenght !== 0 && (
        <MovieSlide
          movies={data.similar_movies.results}
          title="you may also like"
        />
      )}

      {/* recommended movies  */}
      {data.recommendations.results.lenght !== 0 && (
        <MovieSlide
          movies={data.recommendations.results}
          title="recommended for you"
        />
      )}
    </section>
  );
};

export default MovieDetails;

export const ImageSlide = ({ images, title }) => {
  return (
    <div className="space-y-4 px-4 md:px-4">
      <Heading text={title} />
      <Swiper
        className="pb-8"
        pagination={{ dynamicBullets: true }}
        slidesPerView={2}
        // lazy={true}
        modules={[Pagination]}
        breakpoints={{
          600: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
      >
        {images.map((value, index) => (
          <SwiperSlide key={index}>
            <img src={imgUrlSm + value.file_path} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
