import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "@/utils/supabase";
import { Provider } from "@supabase/supabase-js";

// Signup with email and password
export const signup = createAsyncThunk(
  "auth/signup",
  async ({ email, password, username }: { email: string; password: string, username: string }) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      // passo l'username come metadata
      options: {
        data: {
          user_name: username,
        },
      },
    })    
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

// ask for password reset email
export const sendPasswordResetEmail = createAsyncThunk(
  "auth/sendPasswordResetEmail",
  async ({ email }: { email: string }) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://127.0.0.1:5173/reset",
    });
    if (error) throw new Error(error.message);
    return data;
  }
);

// actual password reset
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ new_password }: { new_password: string }) => {
    const { data, error } = await supabase.auth.updateUser({
      password: new_password,
    });
    if (error) throw new Error(error.message);
    return data;
  }
);

// update email, password and username of the user
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async ({ email, password, username }: { email?: string; password?: string; username?: string }) => {
    const { data, error } = await supabase.auth.updateUser({
      email: email,
      password: password,
      data: {
        user_name: username,
      },
    });
    if (error) throw new Error(error.message);
    return data;
  }
);
