import React from "react";
import { Button } from "@heroui/button";
import { useDispatch } from "react-redux";
import { loginWithOAuth } from "@/state/thunks";
import { AppDispatch } from "@/state/store";

const oauth = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleLogin = async (provider: string) => {
    dispatch(loginWithOAuth({ provider: "github" }));
  };

  return (
    <div>
      <Button onPress={() => handleLogin("github")}> Github</Button>
    </div>
  );
};

export default oauth;
