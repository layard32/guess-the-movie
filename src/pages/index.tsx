import DefaultLayout from "@/layouts/default";
import GameLayout from "@/layouts/game";
import { Tabs, Tab } from "@heroui/tabs";
import LocalGameCard from "@/components/localGameComponents/localGameCard";
import { Card, CardBody } from "@heroui/card";
import { useState } from "react";
import LocalGameSingleplayer from "../components/localGameComponents/localGameSingleplayer";
import { movieModel } from "@/state/movieModel";
import { gameModeType } from "@/state/myTypes";
import { playStatusType } from "@/state/myTypes";
import LocalGameResult from "@/components/localGameComponents/localGameResult";

export default function IndexPage() {
  // per tenere traccia dello stato del gioco
  const [playStatus, setPlayStatus] = useState<playStatusType>("waiting");

  // per tenere traccia dell'api response (ottenuta da localGameButtonAPI)
  const [moviesFound, setMoviesFound] = useState<movieModel[]>([]);

  // per tenere traccia della modalità di gioco
  const [gameMode, setGameMode] = useState<gameModeType>("singleplayer");

  // per tenere traccia del numero di giocatori
  const [numberOfPlayers, setNumberOfPlayers] = useState<number>(2);

  // per settare playerNames in base a numberOfPlayers
  const initializePlayerNames = (numberOfPlayers: number) => {
    const newPlayerNames = Array.from({ length: numberOfPlayers }, (_, i) => {
      return `Player ${++i}`;
    });
    return newPlayerNames;
  };
  // per tenere traccia del nome dei giocatori
  const [playerNames, setPlayerNames] = useState<string[]>(
    initializePlayerNames(numberOfPlayers)
  );

  // RENDERING CONDIZIONALE A SECONDA DELLO STATO DEL GIOCO
  // se il gioco è in corso mostro localgamesingleplayer dentro gamelayout
  if (playStatus === "playing") {
    return (
      <GameLayout>
        <LocalGameSingleplayer
          moviesFound={moviesFound}
          gameMode={gameMode}
          setPlayStatus={setPlayStatus}
          {...(gameMode === "group" || gameMode === "1v1"
            ? { playerNames }
            : {})}
        />
      </GameLayout>
    );
  }

  // se il gioco è finito, mostro localgameresult
  if (playStatus === "finished") {
    return (
      <DefaultLayout>
        <LocalGameResult moviesFound={moviesFound} />
      </DefaultLayout>
    );
  }

  // se il gioco è in attesa, mostro la classica schermata con il form
  return (
    <DefaultLayout>
      <div className="flex w-full flex-col justify-center items-center">
        <Tabs size="lg" className="mb-2.5">
          <Tab key="Local" title="Local">
            <Card className="w-[min(500px,80vw)]">
              <CardBody>
                <LocalGameCard
                  setPlayStatus={setPlayStatus}
                  setMoviesFound={setMoviesFound}
                  setGameMode={setGameMode}
                  gameMode={gameMode}
                  setNumberOfPlayers={setNumberOfPlayers}
                  numberOfPlayers={numberOfPlayers}
                  setPlayerNames={setPlayerNames}
                  playerNames={playerNames}
                  initializePlayerNames={initializePlayerNames}
                />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="Online" title="Online" isDisabled={true}>
            TODO
          </Tab>
        </Tabs>
      </div>
    </DefaultLayout>
  );
}
