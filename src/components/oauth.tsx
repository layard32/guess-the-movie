import React from "react";
import { Button } from "@heroui/button";
import { useDispatch } from "react-redux";
import { loginWithOAuth } from "@/state/thunks";
import { AppDispatch } from "@/state/store";

const oauth = () => {
  const dispatch: AppDispatch = useDispatch();

  // la logica viene presa dallo store, precisamente dal thunks loginwithoauth
  const handleLogin = async (provider: string) => {
    dispatch(loginWithOAuth({ provider: "github" }));
  };

  // restituisco un insieme di pulsanti per fare il login con i vari provider
  return (
    <div>
      <Button onPress={() => handleLogin("github")}> Github</Button>
    </div>
  );
};

export default oauth;
