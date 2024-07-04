import React from "react";
import { dateFormat } from "../constants";
import Progress from "./Progress";
import { motion } from "framer-motion";

const Card = ({ title, poster, rating, release }) => {
  return (
    <div className="gap-2">
      {" "}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-white relative rounded-xl gap-2"
      >
        <div
          className=" overflow-hidden rounded-xl
        "
        >
          {poster ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${poster}`}
              alt=""
              className="h-auto w-full hover:scale-105 transition-transform  rounded-xl aspect-[4/6]  "
            />
          ) : (
            <div className="aspect-[4/6] dark:bg-slate-800 bg-slate-200 text-7xl font-bold text-white flex items-center justify-center dark:text-slate-600 rounded-xl ">
              NA
            </div>
          )}
        </div>

        <div className=" md:opacity-0 md:hover:opacity-100 duration-300">
          <div className=" absolute top-0 inset-0 rounded-xl bg-gradient-to-t from-black/70"></div>
          <div className="absolute bottom-5 mt-6 mx-2 space-y-1">
            <Progress
              rating={rating}
              size={"2rem"}
              percent="0.45rem"
              thickness="3px"
            />
            <h3
              className="font-bold leading-tight line-clamp-1 text-gray-100 dark:text-gray-100 "
              title={title}
            >
              {title}
            </h3>
            <h3>
              {release && (
                <p className="text-sm text-white/80 dark:text-white/80">
                  {dateFormat(release)}
                </p>
              )}
            </h3>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
