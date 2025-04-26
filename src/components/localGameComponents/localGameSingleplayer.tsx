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
import CountdownComponent from "../countdownWithSound";
import { Spinner } from "@heroui/spinner";
import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";
import { gameModeType } from "@/state/myTypes";
import { playStatusType } from "@/state/myTypes";

interface Props {
  moviesFound: movieModel[];
  gameMode: gameModeType;
  playerNames?: string[];
  setPlayStatus: React.Dispatch<React.SetStateAction<playStatusType>>;
}

const localGameSingleplayer: React.FC<Props> = ({
  moviesFound,
  gameMode,
  playerNames,
  setPlayStatus,
}: Props) => {
  // GESTIONE ANIMAZIONE REWARD
  const { reward, isAnimating } = useReward("rewardId", "confetti", {
    angle: 90,
  });

  // GESTIONE VIDEO PLAYER
  // stati
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

  // GESTIONE LOGICA
  // stati
  const [currentIndex, setCurrentIndex] = useState<number>(0); // per tenere traccia dell'index del filmato a cui siamo arrivati
  const [guesses, setGuesses] = useState<number>(3); // guesses disponibili ad ogni clip
  const [correctMovies, setCorrectMovies] = useState<number>(0); // film corretti
  const [isChoosing, setIsChoosing] = useState<boolean>(false); // se si sta scegliendo un film

  // aspetto che il video sia caricato prima di metterlo in pausa
  const waitForVideoRef = (): Promise<HTMLVideoElement> => {
    return new Promise((resolve) => {
      const checkVideoRef = () => {
        if (videoRef.current) {
          resolve(videoRef.current);
        } else {
          requestAnimationFrame(checkVideoRef); // utilizzo requestanimationframe per controllare al frame successivo
        }
      };
      checkVideoRef();
    });
  };

  const handleStartChoosing = async () => {
    // l'utente sta scegliendo un film
    setIsChoosing(true);
    // aspetto che il video sia caricato: poi lo metto in pausa
    const videoElement = await waitForVideoRef();
    videoElement.pause();
  };

  const handleMovieSelection = (movieTitle: string) => {
    // l'utente non sta più scegliendo un film
    setIsChoosing(false);
    // rifacciamo partire il video se questo non è finito: altrimenti scarichiamo il prossimo filmato
    if (videoRef.current) {
      if (videoRef.current.ended) {
        downloadNextMovie();
        return;
      } else {
        videoRef.current.play();
      }
    }
    // se le guesses sono finite, non facciamo niente
    if (guesses === 0) return;
    // altrimenti valutiamo se la risposta è corretta o meno
    if (movieTitle === moviesFound[currentIndex - 1].title) handleMovieRight();
    else handleMovieWrong();
  };

  const handleMovieRight = () => {
    // se la risposta è corretta, facciamo partire l'animazione
    // ed incrementiamo il numero di film corretti
    // ed impostiamo moviesFound[currentIndex - 1] come film corretto
    setCorrectMovies(correctMovies + 1);
    reward();
    moviesFound[currentIndex - 1].guessed = true;

    // se era l'ultima clip, impostiamo playStatus a finished
    if (currentIndex >= moviesFound.length) {
      // simulo un caricamento
      setTimeout(() => {
        setPlayStatus("finished");
      }, 1000);
    } else {
      // altrimenti scarichiamo la prossima clip
      downloadNextMovie();
    }
  };

  const handleMovieWrong = () => {
    // decrementiamo il numero di guesses
    // ed impostiamo moviesFound[currentIndex - 1] come film sbagliato
    setGuesses(guesses - 1);
    moviesFound[currentIndex - 1].guessed = false;

    // se le guesses sono finite ed era l'ultima clip, impostiamo playStatus a finished
    if (guesses === 1 && currentIndex >= moviesFound.length) {
      // simulo un caricamento
      setTimeout(() => {
        setPlayStatus("finished");
      }, 1000);
      // se invece non è l'ultima clip, scarichiamo la prossima
    } else if (guesses === 1) downloadNextMovie();
  };

  // gestione chiamata api per scaricare la prossima clip
  const downloadNextMovie = async () => {
    // se siamo già a fine lista, non facciamo niente
    if (currentIndex >= moviesFound.length) return;

    // resettiamo il video player ed il numero di guesses
    setGuesses(3);
    setVideoPlayer(null); // in questo modo viene mostrato lo spinner

    // prendiamo il prossimo filmato ed incrementiamo l'index
    const nextMovie: movieModel = moviesFound[currentIndex];
    setCurrentIndex(currentIndex + 1);

    // stringa per il video
    let videoUrl: string = "";
    try {
      // scarichiamo il filmato facendo una chiamata all'api di clip cafe
      const downloadResponse = await fetch(nextMovie.download);
      // gestione errori HTTP
      if (!downloadResponse.ok)
        throw new Error(`Status: ${downloadResponse.status}`);

      // trasformiamo la risposta in un blob e creiamo un URL per il video
      const blob = await downloadResponse.blob();
      videoUrl = URL.createObjectURL(blob);
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
      // setTimeout(() => {
      //   window.location.href = "/";
      // }, 3000);
    } finally {
      // aspettiamo un secondo (per fingere un caricamento) prima di mostrare il video
      if (videoUrl !== "") {
        setTimeout(() => {
          setVideoPlayer(videoUrl);
        }, 1000);
      }
    }
  };

  // gestione fine video
  const handleMovieEnd = () => {
    // facciamo partire il countdown per dare la possibilità di indovinare il film prima che parta il prossimo
    handleStartChoosing();
  };

  return (
    <>
      {/* la barra superiore al gioco contenente a sinistra il numero di tentativi rimasti e 
      a destra il numero di film azzeccati  */}
      <div className="flex pb-20 justify-between">
        <div className="flex gap-2">
          <AnimatePresence>
            {Array(guesses)
              .fill(null)
              .map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 8,
                      delay: index * 0.1,
                      bounce: 1,
                    },
                  }}
                  exit={{
                    scale: 0,
                    opacity: 0,
                    transition: {
                      duration: 1,
                    },
                  }}
                >
                  <FaHeart size={30} className="text-primary" />
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
        <CountdownComponent
          startCountdown={isChoosing}
          handleCountdownEnd={handleMovieSelection}
        />
        <div className="flex gap-2">
          <AnimatePresence>
            {Array(correctMovies)
              .fill(null)
              .map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 8,
                      delay: index * 0.1,
                      bounce: 1,
                    },
                  }}
                  exit={{
                    scale: 0,
                    opacity: 0,
                    transition: {
                      duration: 1,
                    },
                  }}
                >
                  <FaAward size={30} className="text-primary" />
                </motion.div>
              ))}
          </AnimatePresence>
          <ThemeSwitch className="ml-5" />
        </div>
        {/* valutare posizione themeswitch */}
      </div>

      {videoPlayer !== null ? (
        <video
          ref={videoRef}
          className="mx-auto rounded-xl shadow-lg bg-black object-cover"
          autoPlay
          style={{ width: "800px", height: "450px" }}
          onEnded={handleMovieEnd}
        >
          <source src={videoPlayer} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div
          className="mx-auto rounded-xl shadow-lg bg-black flex items-center justify-center"
          style={{ width: "800px", height: "450px" }}
        >
          <Spinner size="lg" color="primary" />
        </div>
      )}

      {isChoosing ? (
        <SelectMovie handleMovieSelection={handleMovieSelection} />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <p className="text-center mt-20 w-1/2">
            If you click guess, you have 5 seconds to type a movie. Even if you
            don't select anything, when the timer ends you lose a guess!
          </p>
          <Button
            className="mt-3 w-1/12"
            variant="shadow"
            color="danger"
            onPress={handleStartChoosing}
            size="lg"
          >
            GUESS
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
