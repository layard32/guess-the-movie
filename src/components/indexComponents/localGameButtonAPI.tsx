import React, { useState } from "react";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";

interface Props {
  numberOfRounds: string;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setApiResponse: React.Dispatch<React.SetStateAction<string[]>>;
}

const LocalGameSearch: React.FC<Props> = ({
  numberOfRounds,
  setIsPlaying,
  setApiResponse,
}: Props) => {
  // LOGICA API CALL
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const clipcafeKey = import.meta.env.VITE_CLIPCAFE_KEY;
  const numberOfRoundsInt = parseInt(numberOfRounds, 10);

  const handleSearch = async () => {
    // operazioni preliminari
    setIsLoading(true);
    setIsPlaying(false);
    setApiResponse([]);

    // TODO: regolare likes / views / duration / movie year a seconda dell'effetto desiderato
    const queryUrl = `https://api.clip.cafe/?api_key=${clipcafeKey}&size=1000&views=10000-10000000`;
    try {
      const response = await fetch(queryUrl);
      const result = await response.json();

      // prendo soltanto download
      if (result.hits?.hits) {
        const seenMovies = new Set();

        const uniqueIDs = result.hits.hits
          // anzitutto filtro usando un insieme per evitare elementi relativi allo stesso film
          .filter((hit: any) => {
            const movieTitle = hit._source.movie_title;
            if (seenMovies.has(movieTitle)) return false;
            seenMovies.add(movieTitle);
            return true;
          })
          // poi estraggo donwload
          .map((hit: any) => hit._source.download)
          // randomizzo l'array
          .sort(() => 0.5 - Math.random())
          // e ne prendo soltanto numberofrounds
          .slice(0, numberOfRoundsInt);

        setApiResponse(uniqueIDs);
      }
    } catch (err) {
      addToast({
        title: "Error when processing the movies",
        description: err as string,
        color: "danger",
        timeout: 3500,
        shouldShowTimeoutProgress: true,
      });
    } finally {
      // resetto lo stato di caricamento dopo un breve timeout
      setTimeout(() => {
        setIsLoading(false);
        setIsPlaying(true);
      }, 5000);
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
