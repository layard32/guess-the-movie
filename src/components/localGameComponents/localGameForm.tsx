import { Form } from "@heroui/form";
import { Select, SelectItem } from "@heroui/select";
import { IoGameControllerOutline } from "react-icons/io5";
import { GiTabletopPlayers } from "react-icons/gi";
import { IoIosPhonePortrait } from "react-icons/io";
import { MdGroups3 } from "react-icons/md";
import { PiListNumbers } from "react-icons/pi";
import React from "react";
import gameModeType from "@/state/gamemodeType";
import { Accordion, AccordionItem } from "@heroui/accordion";

interface Props {
  numberOfRounds: string;
  setNumberOfRounds: React.Dispatch<React.SetStateAction<string>>;
  gameMode: gameModeType;
  setGameMode: React.Dispatch<React.SetStateAction<gameModeType>>;
  numberOfPlayers: number;
  setNumberOfPlayers: React.Dispatch<React.SetStateAction<number>>;
  playerNames: string[];
  setPlayerNames: React.Dispatch<React.SetStateAction<string[]>>;
  excludedGenres: string[];
  setExcludedGenres: React.Dispatch<React.SetStateAction<string[]>>;
}

const localGameForm: React.FC<Props> = ({
  numberOfRounds,
  setNumberOfRounds,
  gameMode,
  setGameMode,
  numberOfPlayers,
  setNumberOfPlayers,
  playerNames,
  setPlayerNames,
  excludedGenres,
  setExcludedGenres,
}: Props) => {
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
          onSelectionChange={(keys) =>
            setGameMode(Array.from(keys)[0] as gameModeType)
          }
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
          <SelectItem key="Group" textValue="Group">
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
          defaultSelectedKeys={[numberOfRounds]}
          label="Genres "
          className="w-4/5"
          color="secondary"
          variant="faded"
          description="Choose the genres that must be included in the game"
          startContent={<PiListNumbers />}
          size="lg"
          selectedKeys={[numberOfRounds]}
          onSelectionChange={(keys) =>
            setNumberOfRounds(Array.from(keys)[0] as string)
          }
        >
          <SelectItem key="2" textValue="2">
            <div className="flex gap-2 items-center">
              <div className="flex flex-col">
                <span className="text-small">2</span>
                <span className="text-tiny text-default-400">
                  Less round for a quicker game.
                </span>
              </div>
            </div>
          </SelectItem>
          <SelectItem key="3" textValue="3">
            <div className="flex gap-2 items-center">
              <div className="flex flex-col">
                <span className="text-small text-primary">3</span>
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
                  More round for longer game.
                </span>
              </div>
            </div>
          </SelectItem>
        </Select>

        <Accordion className="w-4/5 -mt-3">
          <AccordionItem key="genres" title="Advanced options">
            <div className="flex justify-center">
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
                    setExcludedGenres(Array.from(keys) as string[]);
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
            </div>
          </AccordionItem>
        </Accordion>
      </Form>
    </>
  );
};

export default localGameForm;
