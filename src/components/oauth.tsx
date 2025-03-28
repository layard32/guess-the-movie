import React from "react";
import { Button } from "@heroui/button";
import { useDispatch } from "react-redux";
import { loginWithOAuth } from "@/state/thunks";
import { AppDispatch } from "@/state/store";
import { FaGithub } from "react-icons/fa";
import { Provider } from "@supabase/supabase-js";
import { FaGoogle } from "react-icons/fa";
import { addToast } from "@heroui/toast";
import { useEffect } from "react";

const oauth = () => {
  const dispatch: AppDispatch = useDispatch();

  // la logica viene presa dallo store, precisamente dal thunks loginwithoauth
  const handleLogin = async (provider: Provider) => {
    dispatch(loginWithOAuth({ provider }));
    // imposto una flag del local storage su true
    // così da mostrare un toast grazie all'use effect in app.tsx
    localStorage.setItem("loginSuccess", "true");
  };

  // restituisco un insieme di pulsanti per fare il login con i vari provider
  return (
    <div className="mb-4 flex gap-4 w-full">
      <Button
        onPress={() => handleLogin("github")}
        variant="bordered"
        color="secondary"
      >
        <FaGithub /> Github
      </Button>
      <Button
        onPress={() => handleLogin("google")}
        variant="bordered"
        color="secondary"
      >
        <FaGoogle />
        Google
      </Button>
    </div>
  );
};

export default oauth;
