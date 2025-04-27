import React, { useState } from "react";
import { Button } from "@heroui/button";
import { useGetMoviesFound } from "@/hooks/getMoviesFound";

const LocalGameSearch: React.FC = () => {
  // stato per gestire il caricamento del bottone
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // prendo la funzione dal custom hook
  const { getMoviesFound } = useGetMoviesFound();

  // la wrappo
  const handlePress = async () => {
    await getMoviesFound(setIsLoading);
  };

  return (
    <>
      <Button
        onPress={handlePress}
        size="lg"
        disabled={isLoading}
        isLoading={isLoading}
        color="primary"
        variant="shadow"
        className="w-2/5 mx-auto mt-2 mb-1.5"
      >
        Start the game
      </Button>
    </>
  );
};

export default LocalGameSearch;
