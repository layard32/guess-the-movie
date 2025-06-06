import React, { useCallback } from "react";
import AsyncSelect from "react-select/async";
import debounce from "lodash.debounce";

// definiamo lo stile personalizzato tramite props, come da documentazione di react-select
const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderColor: state.isFocused
      ? "hsl(var(--heroui-primary))"
      : "hsl(var(--heroui-default-200))",
    backgroundColor: "hsl(var(--heroui-default-100))",
    boxShadow: state.isFocused
      ? "0 0 0 1px hsl(var(--heroui-primary))"
      : "none",
    "&:hover": {
      borderColor: "hsl(var(--heroui-primary))",
    },
    borderRadius: "8px",
    height: "3.5rem",
  }),
  input: (provided: any) => ({
    ...provided,
    color: "hsl(var(--heroui-default-foreground))",
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "hsl(var(--heroui-default-foreground))",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "hsl(var(--heroui-default-foreground))",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "hsl(var(--heroui-content1))",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: state.isSelected
      ? "hsl(var(--heroui-primary))"
      : state.isFocused
        ? "hsl(var(--heroui-default-100))"
        : "hsl(var(--heroui-content1))",
    color: state.isSelected
      ? "hsl(var(--heroui-default-100))"
      : "hsl(var(--heroui-default-foreground))",
    "&:hover": {
      backgroundColor: state.isSelected
        ? "hsl(var(--heroui-primary))"
        : "hsl(var(--heroui-default-200))",
      color: state.isSelected
        ? "hsl(var(--heroui-default-100))"
        : "hsl(var(--heroui-default-foreground))",
    },
  }),
};

// componenti customs per mostrare il poster
const CustomOption = (props: any) => {
  const { data, innerRef, innerProps } = props;
  return (
    <div
      ref={innerRef}
      {...innerProps}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px",
      }}
    >
      <img
        src={data.poster}
        alt={data.label}
        style={{ width: "40px", height: "60px", borderRadius: "4px" }}
      />
      <span>{data.label}</span>
    </div>
  );
};

interface Props {
  handleMovieSelection: (movieTitle: string) => void;
}

const SelectMovie: React.FC<Props> = ({ handleMovieSelection }: Props) => {
  // carichiamo i dati da tmdb per il select
  const fetchMovies = async (inputMovieTitle: string) => {
    const TMDB_token = import.meta.env.VITE_TMDB_TOKEN;
    const url = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${inputMovieTitle}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_token}`,
      },
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error fetching movies: ${response.statusText}`);
      }

      const data = await response.json();

      // mappiamo i dati per darli in pasto a react-select
      return data.results.map((movie: any) => ({
        value: movie.title,
        label: movie.title,
        poster: `https://image.tmdb.org/t/p/w92${movie.poster_path}`,
      }));
    } catch (error) {
      console.error("Failed to load movies:", error);
      return [];
    }
  };

  // applico un debouncer (tramite libreria lodash) per evitare di fare troppe chiamate a tmdb
  const loadMovies = useCallback(
    debounce((inputValue: string, callback: any) => {
      fetchMovies(inputValue).then((movies) => {
        callback(movies);
      });
    }, 300),
    []
  );

  return (
    <AsyncSelect
      className="w-[min(500px,80vw)] mx-auto mt-20"
      placeholder="..."
      styles={customStyles}
      isClearable={true}
      isSearchable={true}
      // caricamento asincrono dei dati da tmdb
      loadOptions={loadMovies}
      // componenti personalizzate per mostrare il poster
      components={{
        Option: CustomOption,
      }}
      onChange={(selectedMovie: any) => {
        handleMovieSelection(selectedMovie.value);
      }}
    />
  );
};

export default SelectMovie;
