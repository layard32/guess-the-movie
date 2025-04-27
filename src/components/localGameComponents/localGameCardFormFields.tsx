// import da heroui
import { Accordion, AccordionItem } from "@heroui/accordion";
import { NumberInput } from "@heroui/number-input";
import { Input } from "@heroui/input";
import { Form } from "@heroui/form";
import { Select, SelectItem } from "@heroui/select";

// import di icone
import { IoGameControllerOutline } from "react-icons/io5";
import { GiTabletopPlayers } from "react-icons/gi";
import { IoIosPhonePortrait } from "react-icons/io";
import { MdGroups3 } from "react-icons/md";
import { PiListNumbers } from "react-icons/pi";
import React from "react";

// import di tipi
import { gameModeType } from "@/state/myTypes";

// import per stati con selectors e dispatcher
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/state/store";
import {
  setGameMode,
  setNumberOfRounds,
  setNumberOfPlayers,
  setExcludedGenres,
  setPlayersName,
  selectGameMode,
  selectNumberOfRounds,
  selectNumberOfPlayers,
  selectExcludedGenres,
  selectPlayersName,
} from "@/state/gameSlice";

const localGameForm: React.FC = () => {
  // prendo stati (con selettori) e funzioni per settarli dallo store
  const dispatch: AppDispatch = useDispatch();
  const gameMode: gameModeType = useSelector(selectGameMode);
  const numberOfRounds: number = useSelector(selectNumberOfRounds);
  const numberOfPlayers: number = useSelector(selectNumberOfPlayers);
  const excludedGenres: string[] = useSelector(selectExcludedGenres);
  const playerNames: string[] = useSelector(selectPlayersName);

  return (
    <>
      <Form className="flex flex-col gap-4 justify-center items-center py-2.5 overflow-hidden">
        <Select
          isRequired
          defaultSelectedKeys={[gameMode]}
          label="Game Mode"
          className="w-4/5"
          color="primary"
          variant="faded"
          description="Choose a game mode"
          startContent={<IoGameControllerOutline />}
          size="lg"
          selectedKeys={[gameMode]}
          onSelectionChange={(keys) => {
            dispatch(setGameMode(Array.from(keys)[0] as gameModeType));
            // se la modalità è gruppo o 1v1, setto il numero di giocatori a 2
            if (
              Array.from(keys)[0] === "group" ||
              Array.from(keys)[0] === "1v1"
            ) {
              dispatch(setNumberOfPlayers(2));
            } else {
              dispatch(setNumberOfPlayers(1));
            }
          }}
        >
          <SelectItem key="singleplayer" textValue="Singleplayer">
            <div className="flex gap-2 items-center">
              <IoIosPhonePortrait className="flex-shrink-0 mr-1" />
              <div className="flex flex-col">
                <span className="text-small text-primary">Singleplayer</span>
                <span className="text-tiny text-default-400">
                  The default mode: just you.
                </span>
              </div>
            </div>
          </SelectItem>
          <SelectItem key="1v1" textValue="1v1">
            <div className="flex gap-2 items-center">
              <GiTabletopPlayers className="flex-shrink-0" />
              <div className="flex flex-col">
                <span className="text-small">1v1</span>
                <span className="text-tiny text-default-400">
                  Every player plays one round and then gives the device to the
                  other player.
                </span>
              </div>
            </div>
          </SelectItem>
          <SelectItem key="group" textValue="Group">
            <div className="flex gap-2 items-center">
              <MdGroups3 className="flex-shrink-0" />
              <div className="flex flex-col">
                <span className="text-small">Group</span>
                <span className="text-tiny text-default-400">
                  One player controls the game and needs to stop the timer when
                  a player wants to make a guess.
                </span>
              </div>
            </div>
          </SelectItem>
        </Select>

        <Select
          isRequired
          defaultSelectedKeys={[numberOfRounds.toString()]} // Convert numberOfRounds to a string
          label="Number of rounds"
          className="w-4/5"
          color="primary"
          variant="faded"
          description="Choose the number of rounds"
          startContent={<PiListNumbers />}
          size="lg"
          selectedKeys={[numberOfRounds.toString()]} // Convert numberOfRounds to a string
          onSelectionChange={
            (keys) => dispatch(setNumberOfRounds(Number(Array.from(keys)[0]))) // Convert the selected key back to a number
          }
        >
          <SelectItem key="2" textValue="2">
            <div className="flex gap-2 items-center">
              <div className="flex flex-col">
                <span className="text-small">2</span>
                <span className="text-tiny text-default-400">
                  Less rounds for a quicker game.
                </span>
              </div>
            </div>
          </SelectItem>
          <SelectItem key="3" textValue="3">
            <div className="flex gap-2 items-center">
              <div className="flex flex-col">
                <span className="text-small">3</span>
                <span className="text-tiny text-default-400">
                  The default number of rounds.
                </span>
              </div>
            </div>
          </SelectItem>
          <SelectItem key="4" textValue="4">
            <div className="flex gap-2 items-center">
              <div className="flex flex-col">
                <span className="text-small">4</span>
                <span className="text-tiny text-default-400">
                  More rounds for a longer game.
                </span>
              </div>
            </div>
          </SelectItem>
        </Select>

        {gameMode === "group" && (
          <NumberInput
            className="w-3/5"
            label="Number of players"
            color="secondary"
            variant="faded"
            size="md"
            isRequired
            description="Enter the number of players (min 2, max 4)"
            minValue={2}
            maxValue={4}
            defaultValue={numberOfPlayers}
            onChange={(value) => {
              if (typeof value === "number") {
                dispatch(setNumberOfPlayers(value));
              }
            }}
          />
        )}

        <Accordion className="w-4/5 -mt-3" defaultSelectedKeys={["genres"]}>
          <AccordionItem key="genres" title="Advanced options">
            <div className="flex justify-center flex-col items-center gap-3">
              <Select
                selectionMode="multiple"
                defaultSelectedKeys={excludedGenres.flat()}
                label="Excluded genres"
                className="w-4/5"
                color="secondary"
                variant="faded"
                description="Choose genres to exclude from the game (max 3)"
                size="md"
                selectedKeys={excludedGenres}
                onSelectionChange={(keys) => {
                  // semplice validazione
                  // solamente se il numero di generi esclusi è minore o uguale a 3
                  if (Array.from(keys).length <= 3) {
                    dispatch(setExcludedGenres(Array.from(keys) as string[]));
                  }
                }}
              >
                <SelectItem key="28" textValue="Action">
                  <div className="flex gap-2 items-center">
                    <div className="flex flex-col">
                      <span className="text-small">Action</span>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem key="12" textValue="Adventure">
                  <div className="flex gap-2 items-center">
                    <div className="flex flex-col">
                      <span className="text-small">Adventure</span>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem key="16" textValue="Animation">
                  <div className="flex gap-2 items-center">
                    <div className="flex flex-col">
                      <span className="text-small">
                        Animation (both western and anime)
                      </span>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem key="10749" textValue="Romance">
                  <div className="flex gap-2 items-center">
                    <div className="flex flex-col">
                      <span className="text-small">Romance</span>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem key="27" textValue="Horror">
                  <div className="flex gap-2 items-center">
                    <div className="flex flex-col">
                      <span className="text-small">Horror</span>
                    </div>
                  </div>
                </SelectItem>
              </Select>
              {(gameMode === "group" || gameMode === "1v1") && (
                <div className="w-4/5 flex flex-col gap-4">
                  {Array.from({ length: numberOfPlayers }).map((_, i) => (
                    <Input
                      key={i}
                      color="secondary"
                      variant="faded"
                      isRequired
                      value={playerNames[i]}
                      onChange={(e) => {
                        const newPlayerNames = [...playerNames];
                        newPlayerNames[i] = e.target.value;
                        dispatch(setPlayersName(newPlayerNames));
                      }}
                    ></Input>
                  ))}
                </div>
              )}
            </div>
          </AccordionItem>
        </Accordion>
      </Form>
    </>
  );
};

export default localGameForm;
