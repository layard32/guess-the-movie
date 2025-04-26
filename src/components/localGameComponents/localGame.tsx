import React, { useState } from "react";
import LocalGameForm from "./localGameForm";
import LocalGameButtonAPI from "./localGameButtonAPI";
import { movieModel } from "@/state/movieModel";
import gameModeType from "@/state/gamemodeType";

interface Props {
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setApiResponse: React.Dispatch<React.SetStateAction<movieModel[]>>;
}

const localGame: React.FC<Props> = ({
  setIsPlaying,
  setApiResponse,
}: Props) => {
  // per tenere traccia delle impostazioni della partita
  const [numberOfRounds, setNumberOfRounds] = useState<string>("3");
  // per tenere traccia della modalità di gioco
  const [gameMode, setGameMode] = useState<gameModeType>("singleplayer");
  // per tenere traccia del numero di giocatori
  const [numberOfPlayers, setNumberOfPlayers] = useState<number>(2);
  // per tenere traccia del nome dei giocatori
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  // per tenere traccia dei generi esclusi
  const [excludedGenres, setExcludedGenres] = useState<string[]>([]);

  return (
    <>
      <LocalGameForm
        numberOfRounds={numberOfRounds}
        setNumberOfRounds={setNumberOfRounds}
        gameMode={gameMode}
        setGameMode={setGameMode}
        setNumberOfPlayers={setNumberOfPlayers}
        numberOfPlayers={numberOfPlayers}
        setPlayerNames={setPlayerNames}
        playerNames={playerNames}
        excludedGenres={excludedGenres}
        setExcludedGenres={setExcludedGenres}
      />
      <LocalGameButtonAPI
        numberOfRounds={numberOfRounds}
        setIsPlaying={setIsPlaying}
        setApiResponse={setApiResponse}
      />
    </>
  );
};

export default localGame;
