import React from "react";
import { movieModel } from "@/state/movieModel";

interface Props {
  moviesFound: movieModel[];
}

const localGameResult: React.FC<Props> = ({ moviesFound }: Props) => {
  return (
    <div className="flex flex-col items-center py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Results</h1>

      {/* Flex container for cards */}
      <div className="flex flex-wrap justify-center gap-6">
        {moviesFound.map((movie, index) => (
          <div
            key={index}
            className="relative group rounded-lg overflow-hidden h-80 w-60 shadow-lg transition-transform duration-300 hover:scale-105"
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />

            {/* Movie Poster */}
            <img
              src={movie.poster || "/placeholder.svg"}
              alt={movie.title}
              className="object-cover w-full h-full"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `/placeholder.svg?height=500&width=350&text=${encodeURIComponent(
                  movie.title
                )}`;
              }}
            />

            {/* Content Overlay */}
            <div className="absolute inset-0 z-20 p-4 flex flex-col justify-between">
              {/* Guessed Status */}
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium w-fit ${
                  movie.guessed
                    ? "bg-green-500/80 text-white"
                    : "bg-red-500/80 text-white"
                }`}
              >
                {movie.guessed ? "Correct!" : "Missed"}
              </div>

              {/* Movie Details */}
              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {movie.title}
                </h3>

                {/* Add to Watchlist Button */}
                <button className="w-full px-4 py-2 rounded-lg text-sm font-medium bg-blue-500 text-white hover:bg-blue-600">
                  Add to Watchlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default localGameResult;
