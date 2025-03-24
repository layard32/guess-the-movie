import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchSession, signOut } from "./thunks";

interface AuthState {
  user: any | null;
  session: any | null; 
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  session: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  },
  // aggiunge i reducer per le azioni asincrone
  extraReducers: (builder) => {
    builder
      .addCase(fetchSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSession.fulfilled, (state, action) => {
        state.loading = false;
        state.session = action.payload;
        state.user = action.payload?.user || null;
      })
      .addCase(fetchSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch session";
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.session = null;
      });
  },
});

export default authSlice.reducer;