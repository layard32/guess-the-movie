import React, { useState } from "react";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { movieModel } from "@/state/movieModel";

interface Props {
  numberOfRounds: string;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setApiResponse: React.Dispatch<React.SetStateAction<movieModel[]>>;
}

const LocalGameSearch: React.FC<Props> = ({
  numberOfRounds,
  setIsPlaying,
  setApiResponse,
}: Props) => {
  // LOGICA API CALLs
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const clipcafeKey = import.meta.env.VITE_CLIPCAFE_KEY;
  const TMDB_token = import.meta.env.VITE_TMDB_TOKEN;
  const numberOfRoundsInt = parseInt(numberOfRounds, 10);

  const handleSearch = async () => {
    // reset degli stati
    setIsLoading(true);
    setIsPlaying(false);
    setApiResponse([]);

    // preparo l'array dove metterò i film trovati
    const moviesFound: movieModel[] = [];

    // prendo le pagine random da 1 a 100: andando più in là i film iniziano a diventare meno popolari
    const randomPage = Math.floor(Math.random() * 100) + 1;
    const queryURLTMDB = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${randomPage}&sort_by=popularity.desc`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_token}`,
      },
    };

    try {
      // chiamata a TMDB
      const responseTMDB = await fetch(queryURLTMDB, options);
      if (!responseTMDB.ok)
        throw new Error(
          `Error fetching movies from TMDB: ${responseTMDB.statusText}`
        );
      const dataTMDB = await responseTMDB.json();

      // estraggo i titoli dei film, li randomizzo e ne prendo numberOfRounds + 3 (i tre aggiuntivi
      // servono nel caso in cui non ci siano clip disponibili su clipcafe)
      const movieTitles = dataTMDB.results
        .map((movie: any) => movie.title)
        .sort(() => 0.5 - Math.random())
        .slice(0, numberOfRoundsInt + 3);

      // per ogni film controllo se ci sono clip disponibili su clipcafe
      // se ci sono, aggiungo l'oggetto movieModel all'array moviesFound
      movieTitles.forEach(async (movieTitle: string) => {
        const queryURLCC = `https://api.clip.cafe/?api_key=${clipcafeKey}&movie_title=${movieTitle}&size=3&duration=20-60`;
        const responseCC = await fetch(queryURLCC);
        if (!responseCC.ok)
          throw new Error(
            `Error fetching movies from ClipCafe: ${responseCC.statusText}`
          );
        const dataCC = await responseCC.json();

        // prendo title, poster e download di una clip randomica relativa al film
        if (dataCC.hits?.hits) {
          const uniqueClip: movieModel = dataCC.hits.hits
            .map((hit: any) => ({
              download: hit._source.download,
              title: hit._source.movie_title,
              poster: hit._source.movie_poster,
            }))
            .sort(() => 0.5 - Math.random())[0];

          // l'aggiungo all'array, soltanto se moviesFound non è già pieno
          if (moviesFound.length < numberOfRoundsInt)
            moviesFound.push(uniqueClip);
        }
      });
    } catch (error) {
      addToast({
        title: "Error when processing the movies",
        description:
          error instanceof Error
            ? error.message
            : "An unknown error occurred when fetching movies from TMDB and CC",
        color: "danger",
        timeout: 3500,
        shouldShowTimeoutProgress: true,
      });
    } finally {
      // setto l'api response con l'array di film trovati
      console.log("Movies found: ", moviesFound);
      setApiResponse(moviesFound);

      // resetto lo stato di caricamento dopo un breve timeout
      setTimeout(() => {
        setIsLoading(false);
        setIsPlaying(true);
      }, 3000);
    }
  };

  return (
    <>
      <Button
        onPress={handleSearch}
        size={"lg"}
        disabled={isLoading}
        isLoading={isLoading}
        color="primary"
        variant="shadow"
        className="w-2/5 mx-auto mt-2 mb-1"
      >
        Start the game
      </Button>
    </>
  );
};

export default LocalGameSearch;
