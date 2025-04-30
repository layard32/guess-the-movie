// import da react
import React, { useEffect, useRef, useState } from "react";

// import da heroui
import { Spinner } from "@heroui/spinner";
import { Button } from "@heroui/button";
import { ThemeSwitch } from "@/components/theme-switch";

// import da libreria react-rewards
import { useReward } from "react-rewards";

// import di icone
import { FaHeart } from "react-icons/fa";
import { FaAward } from "react-icons/fa";

// import per stati
import { movieModel } from "@/state/movieModel";
import { useDispatch } from "react-redux";
import {
  selectCurrentClipIndex,
  selectMoviesFound,
  selectGameStatus,
  setGameStatus,
} from "@/state/gameSlice";
import { useSelector } from "react-redux";
import { AppDispatch } from "@/state/store";

// import di componenti
import SelectMovie from "@/components/selectMovie";
import CountdownComponent from "@/components/countdownWithSound";

// import per animazioni da framer-motion
import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";

// import di tipi
import { gameStatusType } from "@/state/myTypes";

// import di custom hooks
import { useDownloadNextClip } from "@/hooks/downloadNextClip";

const localGameSingleplayer: React.FC = () => {
  // * per la risposta corretta utilizzo un'animazione confetti con la libreria react-rewards
  const { reward } = useReward("rewardId", "confetti", {
    angle: 90,
  });

  // * stati per gestire la logica del gioco
  const [guesses, setGuesses] = useState<number>(3); // guesses disponibili ad ogni clip
  const [correctMovies, setCorrectMovies] = useState<number>(0); // film corretti
  const [isChoosing, setIsChoosing] = useState<boolean>(false); // se si sta scegliendo un film

  // * prendo il currentindex, moviesfound e gamestatus dallo store
  const currentIndex: number = useSelector(selectCurrentClipIndex);
  const moviesFound: movieModel[] = useSelector(selectMoviesFound);

  // * setto il dispatch
  const dispatch: AppDispatch = useDispatch();

  // * per gestire il videoplayer uso uno stato, un ref ed una funzione per scaricare la prossima clip, a cui fornisco setGuesses e setVideoPlayer
  const [videoPlayer, setVideoPlayer] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { downloadNextMovie } = useDownloadNextClip();
  const handleDownloadNextMovie = async () => {
    await downloadNextMovie(setGuesses, setVideoPlayer);
  };

  // * quando la pagina viene caricata, mandiamo in play in automatico solo il PRIMO filmato
  // ed utilizzo useRef per farlo eseguire solo al montaggio iniziale
  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current) {
      handleDownloadNextMovie();
      hasRun.current = true;
    }
  }, []);

  //--- LOGICA GIOCO ---//
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
        handleDownloadNextMovie();
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
    // TODO: FIX
    // moviesFound[currentIndex - 1].guessed = true;

    // se era l'ultima clip, impostiamo playStatus a finished
    if (currentIndex >= moviesFound.length) {
      // simulo un caricamento
      setTimeout(() => {
        dispatch(setGameStatus("ended"));
      }, 1000);
    } else {
      console.log("test");
      // altrimenti scarichiamo la prossima clip
      handleDownloadNextMovie();
    }
  };

  const handleMovieWrong = () => {
    // decrementiamo il numero di guesses
    // ed impostiamo moviesFound[currentIndex - 1] come film sbagliato
    setGuesses(guesses - 1);

    // TODO: FIX
    moviesFound[currentIndex - 1].guessed = false;

    // se le guesses sono finite ed era l'ultima clip, impostiamo playStatus a finished
    if (guesses === 1 && currentIndex >= moviesFound.length) {
      // simulo un caricamento
      setTimeout(() => {
        dispatch(setGameStatus("ended"));
      }, 1000);
      // se invece non è l'ultima clip, scarichiamo la prossima
    } else if (guesses === 1) handleDownloadNextMovie();
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
