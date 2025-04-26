import React, { useEffect, useState } from "react";
import LocalGameForm from "./localGameCardForm";
import LocalGameButtonAPI from "./localGameCardButtonAPI";
import { movieModel } from "@/state/movieModel";
import { gameModeType } from "@/state/myTypes";
import { playStatusType } from "@/state/myTypes";

interface Props {
  setPlayStatus: React.Dispatch<React.SetStateAction<playStatusType>>;
  setMoviesFound: React.Dispatch<React.SetStateAction<movieModel[]>>;
  initializePlayerNames: (numberOfPlayers: number) => string[];
  numberOfPlayers: number;
  setNumberOfPlayers: React.Dispatch<React.SetStateAction<number>>;
  playerNames: string[];
  setPlayerNames: React.Dispatch<React.SetStateAction<string[]>>;
  gameMode: gameModeType;
  setGameMode: React.Dispatch<React.SetStateAction<gameModeType>>;
}

const localGame: React.FC<Props> = ({
  setPlayStatus,
  setMoviesFound,
  initializePlayerNames,
  numberOfPlayers,
  setNumberOfPlayers,
  playerNames,
  setPlayerNames,
  gameMode,
  setGameMode,
}: Props) => {
  // per tenere traccia delle impostazioni della partita
  const [numberOfRounds, setNumberOfRounds] = useState<string>("3");

  // per tenere traccia dei generi esclusi
  const [excludedGenres, setExcludedGenres] = useState<string[]>([]);

  // per inserire i player names di defualt quando cambia number of players
  useEffect(() => {
    const newPlayerNames = initializePlayerNames(numberOfPlayers);
    newPlayerNames.forEach((_, index) => {
      // se l'utente ha già scritto un nome, lo manteniamo
      if (playerNames[index] !== undefined) {
        newPlayerNames[index] = playerNames[index];
      }
    });
    setPlayerNames(newPlayerNames);
  }, [numberOfPlayers]);

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
        setPlayStatus={setPlayStatus}
        setMoviesFound={setMoviesFound}
        excludedGenres={excludedGenres}
      />
    </>
  );
};

export default localGame;
