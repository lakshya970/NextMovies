import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { useInfiniteQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Spinner from "../components/Spinner";
import Card from "../components/Card";
import HeadingH1 from "../components/HeadingH1";
import { motion } from "framer-motion";

const Trending = () => {
  const { type } = useParams();
  const [today, setToday] = useState(true);
  const fetchMovies = async ({ pageParams = 1 }) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/${type}/${
        today ? "day" : "week"
      }?api_key=029484b23960c56df6f1d7896bf21408&language=en-US&page=${pageParams}`
    );
    return response.data;
  };

  const { data, isLoading, isError, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery([`trending ${type}`], fetchMovies, {
      getNextPageParam: (lastpage, page) => {
        return lastpage.total_pages != page.length && lastpage.total_pages != 0
          ? page.length + 1
          : undefined;
      },
    });

  useEffect(() => {
    refetch();
  }, []);

  if (isError) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center font-semibold text-lg capitalize text-white bg-slate-900">
        Sorry somating went wrong: (
      </div>
    );
  }

  return (
    <div className="p-4 md:px-4 min-h-screen">
      <div>
        <HeadingH1>trending {type == "movie" ? "movies" : "tv show"}</HeadingH1>
        <div className="h-[3px] bg-green-400 rounded-full w-[200px] mt-1 mb-4"></div>
      </div>
      {/* toggle day and week  */}
      <div className=" relative w-fit border border-black/20 dark:border-white/30 rounded-full p-1 mt-2 mb-4">
        <button
          className=" py-2 px-4 font-semibold relative rounded-full overflow-hidden"
          onClick={() => setToday(true)}
        >
          {today && (
            <motion.div className=" absolute inset-0 bg-green-400"></motion.div>
          )}
          <span className=" isolate">Today</span>
        </button>
        <button
          className="py-2 px-4 font-semibold relative rounded-full overflow-hidden"
          onClick={() => setToday(false)}
        >
          {!today && (
            <motion.div className=" absolute inset-0 bg-green-400"></motion.div>
          )}
          <span className=" isolate">This Week</span>
        </button>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <InfiniteScroll
            dataLength={data.pageParams.length * 20}
            next={fetchNextPage}
            hasMore={hasNextPage}
            loader={<Spinner />}
          >
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
              {data.pages.map((page) =>
                page.results.map((value) => (
                  <Link key={value.id} to={`/${type}/details/${value.id}`}>
                    <Card
                      title={value.title || value.name}
                      poster={value.poster_path}
                      rating={value.vote_average}
                      release={value.release_date || value.first_air_date}
                    />
                  </Link>
                ))
              )}
            </div>
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};

export default Trending;
