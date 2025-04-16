import DefaultLayout from "@/layouts/default";
import GameLayout from "@/layouts/game";
import { Tabs, Tab } from "@heroui/tabs";
import LocalGame from "@/components/indexComponents/localGame";
import { Card, CardBody } from "@heroui/card";
import { useState } from "react";
import LocalGameSingleplayer from "./../components/indexComponents/localGameSingleplayer";
import { movieModel } from "@/state/movieModel";
import SelectMovie from "@/components/selectMovie";

export default function IndexPage() {
  // per tenere traccia se il gioco locale è partito o meno
  const [isPlayingLocal, setIsPlayingLocal] = useState<boolean>(false);
  // per tenere traccia dell'api response (ottenuta da localGameButtonAPI)
  const [apiResponse, setApiResponse] = useState<movieModel[]>([]);

  return isPlayingLocal ? (
    <GameLayout>
      <LocalGameSingleplayer apiResponse={apiResponse} />
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
                />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="Online" title="Online" isDisabled={true}>
            TODO
          </Tab>
        </Tabs>
      </div>
      <SelectMovie />
    </DefaultLayout>
  );
}
