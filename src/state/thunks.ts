import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "@/utils/supabase";
import { Provider } from "@supabase/supabase-js";

// login con email e password
export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }: { email: string; password: string }) => {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw new Error(error.message);
      return data.session;
    }
);

// login con oauth
export const loginWithOAuth = createAsyncThunk(
  "auth/loginWithOAuth",
  async ({ provider }: { provider: Provider }) => {
    const { data, error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) throw new Error(error.message);
    return data;
  }
);

// ottiene la sessione corrente
// filepath: /home/davide/github/guess-the-movie/src/state/thunks.ts
export const fetchSession = createAsyncThunk("auth/fetchSession", async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw new Error(error.message);
  return data.session;
});

// esegue log out
export const signOut = createAsyncThunk("auth/signOut", async () => {
    await supabase.auth.signOut();
    return null;
});