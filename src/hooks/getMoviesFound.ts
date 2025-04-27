import { setGameStatus, setMoviesFound, selectNumberOfRounds, selectExcludedGenres } from "@/state/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/state/store";
import { movieModel } from "@/state/movieModel";
import { addToast } from "@heroui/toast";

// * setIsLoading viene fornito da localGameFormButtonWithAPI.tsx e serve per mostrare
// il caricamento all'interno del bottone
// * gli altri stati vengono importati e settati tramite lo store

export function useGetMoviesFound() {
  const numberOfRounds: number = useSelector(selectNumberOfRounds);
  const excludedGenres: string[] = useSelector(selectExcludedGenres);
  const dispatch: AppDispatch = useDispatch();

  // la funzione ottiene moviesfound tramite le api di clipcafe e tmdb
  const getMoviesFound = async (
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    // 1. reset degli stati per isloading, playstatus e moviesfound
    setIsLoading(true);
    dispatch(setGameStatus("waiting"));
    dispatch(setMoviesFound([]));

    // 2. preparo l'array dove metterò i film trovati
    const moviesFound: movieModel[] = [];

    // 3. converto excluded genres in una stringa separata da virgole
    const excludedGenresString: string = excludedGenres.join(",");

    // 3. prendo le pagine random da 1 a 100: andando più in là i film iniziano a diventare meno popolari
    const randomPage: number = Math.floor(Math.random() * 100) + 1;

    // 4. preparo l'url per la chiamata a TMDB
    const queryURLTMDB = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${randomPage}&sort_by=popularity.desc&without_genres=${excludedGenresString}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    };

    // 5. wrappo la chiamata in un try/catch
    try {
      // chiamata a TMDB
      const responseTMDB = await fetch(queryURLTMDB, options);
      if (!responseTMDB.ok)
        throw new Error(
          `Error fetching movies from TMDB: ${responseTMDB.statusText}`
        );
      const dataTMDB = await responseTMDB.json();

      // estraggo i titoli dei film, li randomizzo e ne prendo numberOfRounds + 4 (gli aggiuntivi
      // servono nel caso in cui non ci siano clip disponibili su clipcafe)
      const movieTitles = dataTMDB.results
        .map((movie: any) => movie.title)
        .sort(() => 0.5 - Math.random())
        .slice(0, numberOfRounds + 4);

      // per ogni film controllo se ci sono clip disponibili su clipcafe
      // se ci sono, aggiungo l'oggetto movieModel all'array moviesFound
      for (const movieTitle of movieTitles) {
        const queryURLCC = `https://api.clip.cafe/?api_key=${import.meta.env.VITE_CLIPCAFE_KEY}&movie_title=${movieTitle}&size=3&duration=20-60`;
        const responseCC = await fetch(queryURLCC);
        if (!responseCC.ok)
          throw new Error(
            `Error fetching movies from ClipCafe: ${responseCC.statusText}`
          );
        const dataCC = await responseCC.json();

        // prendo title, poster e download di una clip randomica relativa al film
        // ma soltanto se ci sta almeno una clip disponibile
        if (dataCC.hits?.hits && dataCC.hits.hits.length > 0) {
          const uniqueClip: movieModel = dataCC.hits.hits
            .map((hit: any) => ({
              download: hit._source.download,
              title: hit._source.movie_title,
              poster: hit._source.movie_poster,
              guessed: false,
            }))
            .sort(() => 0.5 - Math.random())[0];

          // l'aggiungo all'array, soltanto se moviesFound non è già pieno
          if (uniqueClip && moviesFound.length < numberOfRounds)
            moviesFound.push(uniqueClip);
        }
      }
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
      dispatch(setMoviesFound(moviesFound));

      // resetto lo stato di caricamento dopo un breve timeout per simulare un caricamento
      setTimeout(() => {
        setIsLoading(false);
        dispatch(setGameStatus("playing"));
      }, 3000);
    }
  };

  return { getMoviesFound };
}