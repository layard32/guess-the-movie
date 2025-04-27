// import da heroui
import { Card, CardBody } from "@heroui/card";
import { Tabs, Tab } from "@heroui/tabs";

// import di layout
import DefaultLayout from "@/layouts/default";
import GameLayout from "@/layouts/game";

// import di componenti
import LocalGameForm from "@/components/localGameComponents/localGameForm";
import LocalGameSingleplayer from "@/components/localGameComponents/localGameSingleplayerComponents/localGameSingleplayer";
import LocalGameSingleplayerResult from "@/components/localGameComponents/localGameSingleplayerComponents/localGameResult";

// importo tipi e store
import { gameStatusType, gameType, gameModeType } from "@/state/myTypes";
import { useSelector } from "react-redux";
import {
  selectGameStatus,
  selectGame,
  selectGameMode,
} from "@/state/gameSlice";

export default function IndexPage() {
  // prendo dallo store:
  // * lo stato del gioco (playing, ended, waiting)
  // * il tipo di gioco (local, online)
  // * la modalità di gioco (singleplayer, multiplayer)
  // e faccio un rendering condizionale
  const gameStatus: gameStatusType = useSelector(selectGameStatus);
  const game: gameType = useSelector(selectGame);
  const gameMode: gameModeType = useSelector(selectGameMode);

  if (gameStatus === "playing") {
    return (
      <GameLayout>
        {game === "local" && gameMode === "singleplayer" && (
          <LocalGameSingleplayer />
        )}
      </GameLayout>
    );
  } else if (gameStatus === "ended") {
    return (
      <DefaultLayout>
        {game === "local" && gameMode === "singleplayer" && (
          <LocalGameSingleplayerResult />
        )}
      </DefaultLayout>
    );
  } else
    return (
      <DefaultLayout>
        <div className="flex w-full flex-col justify-center items-center">
          <Tabs size="lg" className="mb-2.5">
            <Tab key="Local" title="Local">
              <Card className="w-[min(500px,80vw)]">
                <CardBody>
                  <LocalGameForm />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="Online" title="Online" isDisabled={true}>
              {/* TODO */}
            </Tab>
          </Tabs>
        </div>
      </DefaultLayout>
    );
}
