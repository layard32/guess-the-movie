import React, { useState } from "react";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";

interface Props {
  numberOfRounds: string;
}

const LocalGameSearch: React.FC<Props> = ({ numberOfRounds }: Props) => {
  // converto il prop numberOfRounds in un numero
  const numberOfRoundsInt = parseInt(numberOfRounds, 10);

  // volendo si potrebbe spostare la logica all'interno di un hook
  // LOGICA API CALL
  const [apiResponse, setApiResponse] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // prendo l'api tramite vite
  const clipcafeKey = import.meta.env.VITE_CLIPCAFE_KEY;

  const handleSearch = async () => {
    // operazioni preliminari
    setIsLoading(true);
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

        if (uniqueIDs.length > 0) {
          const firstMovie = uniqueIDs[0];
          console.log("Downloading first movie:", firstMovie);

          const downloadResponse = await fetch(firstMovie);

          //   const blob = await downloadResponse.blob();
          //   const videoUrl = URL.createObjectURL(blob);
          //   setVideoPlayer(videoUrl); // Set the video URL to state
        }
      }
    } catch (err) {
      addToast({
        title: "Error when searching the movie",
        description: err as string,
        color: "danger",
        timeout: 3500,
        shouldShowTimeoutProgress: true,
      });
    } finally {
      // resetto lo stato di caricamento dopo un breve timeout
      setTimeout(() => {
        setIsLoading(false);
      }, 5000);
    }
  };

  // TODO: mettere apposto
  const [videoPlayer, setVideoPlayer] = useState<string | null>(null);
  //   const handleDownload = async () => {
  //     // per ora prendo solo il primo array da apiResponse
  //     const firstMovie = apiResponse[0];
  //     console.log(firstMovie);

  //     try {
  //       const response = await fetch(firstMovie);
  //       console.log("RESPONSE:", response);
  //       // Convert the response to a Blob (binary data)
  //       //   const blob = await response.blob();

  //       // Create a URL for the Blob
  //       //   const videoUrl = URL.createObjectURL(blob);

  //       // Set the video URL to state
  //       setVideoPlayer(videoUrl);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

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
      {/* <Button onPress={handleDownload} size={"lg"}>
        {" "}
        Download{" "}
      </Button> */}

      {/* {videoPlayer && (
        <video controls width="600">
          <source src={videoPlayer} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )} */}
    </>
  );
};

export default LocalGameSearch;
