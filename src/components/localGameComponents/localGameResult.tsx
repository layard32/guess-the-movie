import React from "react";
import { movieModel } from "@/state/movieModel";
import { Card, CardBody } from "@heroui/card";

interface Props {
  moviesFound: movieModel[];
}

const localGameResult: React.FC<Props> = ({ moviesFound }: Props) => {
  return (
    <div className="flex w-full flex-col justify-center items-center">
      <Card className="w-[min(500px,80vw)]">
        <CardBody className="flex gap-2">
          {moviesFound.map((movie, index) => (
            <div key={index} className="flex gap-2">
              <img
                src={movie.poster}
                alt={`${movie.title} poster`}
                className="w-1/4 max-w-[150px] h-auto object-contain"
              />
              <h3
                className={`font-bold ${
                  movie.guessed ? "text-success" : "text-danger"
                }`}
              >
                {movie.guessed
                  ? `You guessed ${movie.title}`
                  : `You didn't guess ${movie.title}`}
              </h3>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
};

export default localGameResult;
