import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "@heroui/button";

interface Props {
  apiResponse: string[];
}

const localGameSingleplayer: React.FC<Props> = ({ apiResponse }: Props) => {
  // creiamo il video player
  const [videoPlayer, setVideoPlayer] = useState<string | null>(null);
  // per tenere traccia dell'index del filmato a cui siamo arrivati
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // TODO: quando la pagina viene caricata, mandiamo in play in automatico solo il PRIMO filmato

  // per scaricare il prossimo filmato
  const downloadNextMovie = async () => {
    console.log(apiResponse);
    // se siamo già a fine lista, non facciamo niente
    if (currentIndex >= apiResponse.length) return;
    const nextMovie = apiResponse[currentIndex];
    setCurrentIndex(currentIndex + 1);
    try {
      const downloadResponse = await fetch(nextMovie);
      const blob = await downloadResponse.blob();
      const videoUrl = URL.createObjectURL(blob);
      setVideoPlayer(videoUrl);
    } catch (err) {
      console.error("Error downloading video:", err);
    }
  };

  return (
    <>
      {videoPlayer && (
        <video autoPlay width="600">
          <source src={videoPlayer} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      <Button onPress={downloadNextMovie}> Next movie </Button>
    </>
  );
};

export default localGameSingleplayer;
