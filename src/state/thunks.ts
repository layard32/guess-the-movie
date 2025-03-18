import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "@/utils/supabase";

// esegue login
export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }: { email: string; password: string }) => {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw new Error(error.message);
      return data.session;
    }
);

// ottiene la sessione corrente
export const fetchSession = createAsyncThunk("auth/fetchSession", async () => {
    const { data } = await supabase.auth.getSession();
    return data.session;
  });

// esegue log out
export const signOut = createAsyncThunk("auth/signOut", async () => {
    await supabase.auth.signOut();
    return null;
});