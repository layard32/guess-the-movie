import { selectMoviesFound, selectCurrentClipIndex, setCurrentClipIndex } from "@/state/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/state/store";
import { movieModel } from "@/state/movieModel";
import { addToast } from "@heroui/toast";

// * setGuesses e setVideoPlayer vengono da localGameSingleplayer.tsx

// * gli altri stati vengono importati e settati tramite lo store
export function useDownloadNextClip() {
  const dispatch: AppDispatch = useDispatch();
  const currentIndex: number = useSelector(selectCurrentClipIndex);
  const moviesFound: movieModel[] = useSelector(selectMoviesFound);

  // * la chiave di clipcafe viene importata tramite vite
  const clipcafeKey = import.meta.env.VITE_CLIPCAFE_KEY;

  // la funzione scarica la prossima clip usando le api di clipcafe
  const downloadNextMovie = async (
    setGuesses: React.Dispatch<React.SetStateAction<number>>,
    setVideoPlayer: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    // 1. reset degli stati e controllo fine gioco
    if (currentIndex >= moviesFound.length) return;
    setGuesses(3);
    setVideoPlayer(null); // in questo modo viene mostrato lo spinner

    // 2. prendiamo il prossimo filmato ed incrementiamo l'index
    const nextMovie: movieModel = moviesFound[currentIndex];
    dispatch(setCurrentClipIndex(currentIndex + 1));

    // 3. preparazione url per la chiamata a clipcafe
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
      // aspettiamo un secondo (per simulare un caricamento) prima di mostrare il video
      if (videoUrl !== "") {
        setTimeout(() => {
          setVideoPlayer(videoUrl);
        }, 1000);
      }
    }
  };

  return { downloadNextMovie };
}