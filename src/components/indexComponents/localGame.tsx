import React, { useState } from "react";
import LocalGameForm from "./localGameForm";
import LocalGameButtonAPI from "./localGameButtonAPI";
import { movieModel } from "@/state/movieModel";

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

  return (
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
  );
};

export default localGame;
