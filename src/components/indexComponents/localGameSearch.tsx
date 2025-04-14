import React, { useState } from "react";
import { Button } from "@heroui/button";

interface Props {
  numberOfRounds: string;
}

const LocalGameSearch: React.FC<Props> = ({ numberOfRounds }: Props) => {
  // converto il prop numberOfRounds in un numero
  const numberOfRoundsInt = parseInt(numberOfRounds, 10);

  // volendo si potrebbe spostare la logica all'interno di un hook
  // LOGICA API CALL
  const [apiResponse, setApiResponse] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // prendo l'api tramite vite
  const clipcafeKey = import.meta.env.VITE_CLIPCAFE_KEY;

  const handleSearch = async () => {
    // operazioni preliminari
    setIsLoading(true);
    setApiResponse([]);

    // TODO: regolare likes / views a seconda dell'effetto desiderato
    const queryUrl = `https://api.clip.cafe/?api_key=${clipcafeKey}&size=1000&views=10000-10000000`;
    try {
      const response = await fetch(queryUrl);
      const result = await response.json();

      // prendo soltanto le clipID della risposta (se esistono) e da film diversi
      if (result.hits?.hits) {
        const seenMovies = new Set();

        const uniqueClipIDs = result.hits.hits
          // anzitutto filtro usando un insieme per evitare clipID relative allo stesso film
          .filter((hit: any) => {
            const movieTitle = hit._source.movie_title;
            if (seenMovies.has(movieTitle)) return false;
            seenMovies.add(movieTitle);
            return true;
          })
          // poi estraggo i clip ids
          .map((hit: any) => hit._source.clipID)
          // randomizzo l'array
          .sort(() => 0.5 - Math.random())
          // e ne prendo soltanto numberofrounds
          .slice(0, numberOfRoundsInt);

        setApiResponse(uniqueClipIDs);
      }
    } catch (err) {
      // todo: gestire errori
      console.error("Error fetching data:", err);
    } finally {
      // resetto lo stato di caricamento dopo un breve timeout
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <>
      <Button
        onPress={handleSearch}
        size={"lg"}
        disabled={isLoading}
        isLoading={isLoading}
      >
        Search
      </Button>
      <ul>
        {apiResponse.map((clipID, index) => (
          <li key={index}>{clipID}</li>
        ))}
      </ul>
    </>
  );
};

export default LocalGameSearch;
