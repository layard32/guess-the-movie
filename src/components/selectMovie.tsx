import { menu } from "@heroui/theme";
import AsyncSelect from "react-select/async";

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
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "hsl(var(--heroui-content1))",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
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

// carico i titoli da api TMDB
const loadMovies = async (inputMovieTitle: string) => {
  try {
    const TMDB_token = import.meta.env.VITE_TMDB_TOKEN;
    const url = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${inputMovieTitle}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_token}`,
      },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Error fetching movies: ${response.statusText}`);
    }

    const data = await response.json();

    console.log(data);

    // mappiamo i risultati per darli a react-select
    return data.results.map((movie: any) => ({
      value: movie.title,
      label: movie.title,
    }));
  } catch (error) {
    console.error("Failed to load movies:", error);
    return [];
  }
};

export default function SelectMovie() {
  return (
    <AsyncSelect
      placeholder="Search for a movie..."
      styles={customStyles}
      isClearable={true}
      isSearchable={true}
      // caricamento asincrono
      loadOptions={loadMovies}
    />
  );
}
