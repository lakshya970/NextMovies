import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import axios from "axios";
import Loader from "../components/Loader";
import Card from "../components/Card";
import Spinner from "../components/Spinner";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import HeadingH1 from "../components/HeadingH1";

const UniversalGrid = () => {
  const { type, category } = useParams();

  const getTitle = (category, type) => {
    return `${category.split("_").join(" ")} ${
      type == "movie" ? "movies" : "tv shows"
    }`;
  };

  const fetchMovies = async ({ pageParam = 1 }) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/${type}/${category}?api_key=029484b23960c56df6f1d7896bf21408&language=en-US&page=${pageParam}`
    );

    return response.data;
  };

  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery([getTitle(type, category) + "grid"], fetchMovies, {
      getNextPageParam: (lastpage, page) => {
        return lastpage.total_pages != page.length && lastpage.total_pages != 0
          ? page.length + 1
          : undefined;
      },
    });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (isError) {
    return (
      <div className=" min-h-screen w-full flex items-center justify-center text-lg font-semibold capitalize bg-slate-900 text-white">
        Sorry something went wrong : (
      </div>
    );
  }

  return (
    <div className="p-4 md:px-4 min-h-screen space-y-4">
      <HeadingH1>{getTitle(category, type)}</HeadingH1>
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
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5 mb-4">
              {data.pages.map((page) =>
                page.results.map((value) => (
                  <Link key={value.id} to={`/${type}/details/${value.id}`}>
                    <Card
                      title={value.title || value.name}
                      poster={value.poster_path}
                      rating={value.vote_average}
                      release={value.release_date}
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

export default UniversalGrid;
