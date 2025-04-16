import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { addToast } from "@heroui/toast";
import { FaHeart } from "react-icons/fa";
import { FaAward } from "react-icons/fa";
import { ThemeSwitch } from "@/components/theme-switch";
import { movieModel } from "@/state/movieModel";
import SelectMovie from "@/components/selectMovie";
import { useReward } from "react-rewards";
import { Button } from "@heroui/button";
import CountdownComponent from "../countdown";

interface Props {
  apiResponse: movieModel[];
}

const localGameSingleplayer: React.FC<Props> = ({ apiResponse }: Props) => {
  // gestione animazione di reward
  const { reward, isAnimating } = useReward("rewardId", "confetti", {
    angle: 90,
  });

  // gestione video player
  const [videoPlayer, setVideoPlayer] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // quando la pagina viene caricata, mandiamo in play in automatico solo il PRIMO filmato
  const hasRun = useRef(false); // utilizzo useRef per farlo eseguire solo al montaggio iniziale
  useEffect(() => {
    if (!hasRun.current) {
      downloadNextMovie();
      hasRun.current = true;
    }
  }, []);

  // gestione logica
  const [currentIndex, setCurrentIndex] = useState<number>(0); // per tenere traccia dell'index del filmato a cui siamo arrivati
  const [guesses, setGuesses] = useState<number>(3); // guesses disponibili ad ogni clip
  const [areGuessesOver, setAreGuessesOver] = useState<boolean>(false); // se sono finiti i tentativi
  const [correctMovies, setCorrectMovies] = useState<number>(0); // film corretti
  const [isChoosing, setIsChoosing] = useState<boolean>(false); // se si sta scegliendo un film

  const handleChoosing = () => {
    setIsChoosing(true);
  };

  const handleMovieSelection = (movieTitle: string) => {
    setIsChoosing(false);
    if (movieTitle === apiResponse[currentIndex - 1].title) handleMovieRight();
    else handleMovieWrong();
  };

  const handleMovieRight = () => {
    setCorrectMovies(correctMovies + 1);
    if (guesses === 0) {
      setAreGuessesOver(true);
      return;
    }
    reward();
    downloadNextMovie();
  };

  const handleMovieWrong = () => {
    setGuesses(guesses - 1);
    if (guesses === 1) setAreGuessesOver(true);
    if (guesses === 0) downloadNextMovie();
  };

  // gestione chiamata api
  const downloadNextMovie = async () => {
    // se siamo già a fine lista, non facciamo niente
    if (currentIndex >= apiResponse.length) return;
    // resettiamo il video player ed il numero di guesses
    setGuesses(3);
    setAreGuessesOver(false);
    setVideoPlayer(null);
    const nextMovie: movieModel = apiResponse[currentIndex];
    setCurrentIndex(currentIndex + 1);
    try {
      const downloadResponse = await fetch(nextMovie.download);
      // gestione errori HTTP
      if (!downloadResponse.ok)
        throw new Error(`Status: ${downloadResponse.status}`);
      const blob = await downloadResponse.blob();
      const videoUrl = URL.createObjectURL(blob);
      setVideoPlayer(videoUrl);
    } catch (err) {
      addToast({
        title: "Error when downloading the movies",
        description:
          err instanceof Error ? err.message : "An unknown error occurred",
        color: "danger",
        timeout: 2900,
        shouldShowTimeoutProgress: true,
      });
      // reindirizzo all'home page dopo il toast
      // soluzione temporanea! TODO: MANDARE IL TOAST DOPO REINDIRIZZAMENTO COME FATTO PER OAUTH
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    }
  };

  return (
    <>
      {/* la barra superiore al gioco contenente a sinistra il numero di tentativi rimasti e 
      a destra il numero di film azzeccati  */}
      <div className="flex pb-20 justify-between">
        <div className="flex gap-2">
          {Array(guesses)
            .fill(null)
            .map((_, index) => (
              <FaHeart key={index} size={30} className="text-primary" />
            ))}
        </div>
        <CountdownComponent />
        <div className="flex gap-2">
          {Array(correctMovies)
            .fill(null)
            .map((_, index) => (
              <FaAward key={index} size={30} className="text-primary" />
            ))}
          <ThemeSwitch className="ml-5" />
        </div>
        {/* valutare posizione themeswitch */}
      </div>

      {videoPlayer ? (
        <video
          ref={videoRef}
          className="mx-auto rounded-xl shadow-lg bg-black object-cover"
          autoPlay
          style={{ width: "800px", height: "450px" }}
        >
          <source src={videoPlayer} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        // TODO: aggiungere spinner e delay di caricamento
        <div
          className="mx-auto rounded-xl shadow-lg bg-black"
          style={{ width: "800px", height: "450px" }}
        />
      )}

      {isChoosing ? (
        <SelectMovie handleMovieSelection={handleMovieSelection} />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <p className="text-center mt-12 w-1/2">
            If you click guess, you have 5 seconds to type a movie. Even if you
            don't select anything, when the timer ends you lose a guess!
          </p>
          <Button
            className="mt-3 w-1/12"
            variant="shadow"
            color="primary"
            onPress={handleChoosing}
          >
            Guess
          </Button>
        </div>
      )}

      <span
        id="rewardId"
        className="w-0 h-0 fixed bottom-1/4 left-1/2 -translate-x-1/2"
      ></span>
    </>
  );
};

export default localGameSingleplayer;
