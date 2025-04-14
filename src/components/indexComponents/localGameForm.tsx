import { Form } from "@heroui/form";
import { Select, SelectItem } from "@heroui/select";
import { IoGameControllerOutline } from "react-icons/io5";
import { GiTabletopPlayers } from "react-icons/gi";
import { IoIosPhonePortrait } from "react-icons/io";
import { MdGroups3 } from "react-icons/md";
import { PiListNumbers } from "react-icons/pi";
import LocalGameSearch from "./localGameSearch";
import { useState } from "react";

const localGameForm = () => {
  const [numberOfRounds, setNumberOfRounds] = useState("3");

  return (
    <>
      <Form className="flex flex-col gap-4 justify-center items-center py-2.5">
        <Select
          isRequired
          defaultSelectedKeys={["singleplayer"]}
          label="Game Mode"
          className="w-4/5"
          color="primary"
          variant="faded"
          description="Choose a game mode"
          startContent={<IoGameControllerOutline />}
          size="lg"
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
          label="Number of rounds"
          className="w-4/5"
          color="secondary"
          variant="faded"
          description="Choose the number of rounds"
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
      </Form>

      {/* componente col pulsante e la logica per gestire la chiamata APi */}
      <LocalGameSearch numberOfRounds={numberOfRounds} />
    </>
  );
};

export default localGameForm;
