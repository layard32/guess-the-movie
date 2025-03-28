import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "@/utils/supabase";
import { Provider } from "@supabase/supabase-js";

// Signup with email and password
export const signup = createAsyncThunk(
  "auth/signup",
  async ({ email, password }: { email: string; password: string }) => {
    // prima di fare il signup controllo se l'email è già registrata
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password: "dummy_password", // uso una dumy-password perché non voglio fare il login
    });

    if (!signInError || signInError.message === "Invalid login credentials") {
      // se non ci sono errori o l'errore è "Invalid login credentials", significa che l'email è già registrata
      throw new Error("Data not valid.");
    }

    // se l'email non è registrata, procedo con il signup
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw new Error(error.message);
    return data;
  }
);

// Login with email and password
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    return data.session;
  }
);

// Login or signup with OAuth
export const loginWithOAuth = createAsyncThunk(
  "auth/loginWithOAuth",
  async ({ provider }: { provider: Provider }) => {
    const { data, error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) throw new Error(error.message);
    return data;
  }
);

// Fetch the current session
export const fetchSession = createAsyncThunk("auth/fetchSession", async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw new Error(error.message);
  return data.session;
});

// Logout
export const signOut = createAsyncThunk("auth/signOut", async () => {
  await supabase.auth.signOut();
  return null;
});