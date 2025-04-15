import React, { useEffect } from "react";
import LocalGameForm from "./localGameForm";
import LocalGameButtonAPI from "./localGameButtonAPI";
import LocalGameSingleplayer from "./localGameSingleplayer";

const localGame: React.FC = () => {
  // per tenere traccia se il gioco è partito o meno
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  // per tenere traccia dell'api response (ottenuto da localGameButtonAPI)
  const [apiResponse, setApiResponse] = React.useState<string[]>([]);
  // per tenere traccia delle impostazioni della partita
  const [numberOfRounds, setNumberOfRounds] = React.useState<string>("3");

  return (
    <>
      {isPlaying ? (
        <LocalGameSingleplayer />
      ) : (
        <>
          <LocalGameForm
            numberOfRounds={numberOfRounds}
            setNumberOfRounds={setNumberOfRounds}
          />
          <LocalGameButtonAPI
            numberOfRounds={numberOfRounds}
            setIsPlaying={setIsPlaying}
            setApiResponse={setApiResponse}
          />
        </>
      )}
    </>
  );
};

export default localGame;
