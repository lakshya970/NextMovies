import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import Loading from "../components/Loading";
import Card from "../components/Card";
import Spinner from "../components/Spinner";
import { Link, useParams } from "react-router-dom";

const Search = () => {
  const { query } = useParams();
  const [isMovie, setIsMovie] = useState(true);
  const fetchMovie = async ({ pageParam = 1 }) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/${
        isMovie ? "movie" : "tv"
      }?api_key=029484b23960c56df6f1d7896bf21408&language=en-US&page=${pageParam}&query=${query}`
    );

    return response.data;
  };
  const { data, isLoading, refetch, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery(["search", query], fetchMovie, {
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
      <div className=" min-h-screen w-full flex items-center justify-center text-lg font-semibold capitalize bg-slate-900 text-white">
        Sorry, something went wrong : (
      </div>
    );
  }

  return (
    <div className="py-4 p-2 md:px-4 min-h-screen">
      {isLoading ? (
        <Loading key={1} />
      ) : (
        <div className="space-y-4">
          {/* toggle day and week */}
          <div className=" relative w-fit border-2 border-black/20 dark:border-white/30 rounded-full p-1">
            <div
              className={`absolute inset-y-0 m-1 duration-200 ease-linear w-1/2 bg-green-400 rounded-full ${
                isMovie ? "left-0" : "left-[4.70rem]"
              }`}
            ></div>
            <button
              className=" font-semibold py-2 w-20 text-center uppercase isolate"
              onClick={() => setIsMovie(true)}
            >
              movie
            </button>
            <button
              className=" font-semibold py-2 w-20 text-center uppercase isolate"
              onClick={() => setIsMovie(false)}
            >
              tv
            </button>
          </div>
          {/* results */}
          <div className=" text-lg md:text-start font-medium">
            <span className=" capitalize">search results of :</span>
            <span className="text-green-400"> {query}</span>
            <div className="text-lg capitalize font-light">
              {data.pages[0].total_results} results found
            </div>
          </div>
          <div>
            <InfiniteScroll
              dataLength={data.pageParams.length * 20}
              next={fetchNextPage}
              hasMore={hasNextPage}
              loader={<Spinner />}
              endMessage={
                <div className="text-center capitalize dark:text-slate-300">
                  no more items to show.
                </div>
              }
            >
              <div className=" grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-5 md:gap-4 mb-4">
                {data.pages.map((page) =>
                  page.results.map((value) => (
                    <Link
                      key={value.id}
                      to={`/${isMovie ? "movie" : "tv"}/details/${value.id}`}
                      // to={`movie/details/${value.id}`}
                    >
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
        </div>
      )}
    </div>
  );
};

export default Search;
