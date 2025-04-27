import React from "react";
import LocalGameFormFields from "./localGameCardFormFields";
import LocalGameFormButtonWithAPI from "./localGameCardFormButtonWithAPI";

const localGame: React.FC = () => {
  return (
    <>
      <LocalGameFormFields />
      <LocalGameFormButtonWithAPI />
    </>
  );
};

export default localGame;
