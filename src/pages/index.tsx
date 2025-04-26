import DefaultLayout from "@/layouts/default";
import GameLayout from "@/layouts/game";
import { Tabs, Tab } from "@heroui/tabs";
import LocalGame from "@/components/localGameComponents/localGameCard";
import { Card, CardBody } from "@heroui/card";
import { useState } from "react";
import LocalGameSingleplayer from "../components/localGameComponents/localGameSingleplayer";
import { movieModel } from "@/state/movieModel";
import gameModeType from "@/state/gamemodeType";

export default function IndexPage() {
  // per tenere traccia se il gioco locale è partito o meno
  const [isPlayingLocal, setIsPlayingLocal] = useState<boolean>(false);

  // per tenere traccia dell'api response (ottenuta da localGameButtonAPI)
  const [apiResponse, setApiResponse] = useState<movieModel[]>([]);

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

  return isPlayingLocal ? (
    <GameLayout>
      <LocalGameSingleplayer
        apiResponse={apiResponse}
        gameMode={gameMode}
        {...(gameMode === "group" || gameMode === "1v1" ? { playerNames } : {})}
      />
    </GameLayout>
  ) : (
    <DefaultLayout>
      <div className="flex w-full flex-col justify-center items-center">
        <Tabs size="lg" className="mb-2.5">
          <Tab key="Local" title="Local">
            <Card className="w-[min(500px,80vw)]">
              <CardBody>
                <LocalGame
                  setIsPlaying={setIsPlayingLocal}
                  setApiResponse={setApiResponse}
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
