import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // use localStorage for persistence
import authReducer from "./authSlice";
import gameReducer from "./gameSlice";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

// utilizzo persist per memorizzare lo stato dell'auth
// in modo che non venga perso al refresh della pagina
const persistConfig = {
  key: "auth", 
  storage, 
};

// creo il reducer persistente (solo per auth!)
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// creo lo store
const store = configureStore({
  reducer: {
    game: gameReducer,
    auth: persistedAuthReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// creo ed esporto persistor
export const persistor = persistStore(store);
// esporto tutte le altre cose utili
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;