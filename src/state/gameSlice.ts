import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { movieModel } from "./movieModel";
import { gameModeType, gameStatusType } from "./myTypes";

interface GameState {
    moviesFound: movieModel[];
    gameStatus: gameStatusType;
    gameMode: gameModeType;
    numberOfRounds: number;
    numberOfPlayers: number;
    playersName: string[];
}

const initialState: GameState = {
    moviesFound: [],
    gameStatus: "waiting",
    gameMode: "singleplayer",
    numberOfRounds: 3,
    numberOfPlayers: 1,
    playersName: [],
};

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setMoviesFound: (state, action: PayloadAction<movieModel[]>) => {
            state.moviesFound = action.payload;
        },
        setGameStatus: (state, action: PayloadAction<gameStatusType>) => {
            state.gameStatus = action.payload;
        },
        setGameMode: (state, action: PayloadAction<gameModeType>) => {
            state.gameMode = action.payload;
        },
        setNumberOfRounds: (state, action: PayloadAction<number>) => {
            state.numberOfRounds = action.payload;
        },
        setNumberOfPlayers: (state, action: PayloadAction<number>) => {
            state.numberOfPlayers = action.payload;
        },
        setPlayersName: (state, action: PayloadAction<string[]>) => {
            state.playersName = action.payload;
        },
    }
});

// esportiamo il reducer
export default gameSlice.reducer;

// esportiamo i selectors
export const selectMoviesFound = (state: any) => state.game.moviesFound;
export const selectGameStatus = (state: any) => state.game.gameStatus;
export const selectGameMode = (state: any) => state.game.gameMode;
export const selectNumberOfRounds = (state: any) => state.game.numberOfRounds;
export const selectNumberOfPlayers = (state: any) => state.game.numberOfPlayers;
export const selectPlayersName = (state: any) => state.game.playersName;

// esportiamo le azioni
export const {
    setMoviesFound,
    setGameStatus,
    setGameMode,
    setNumberOfRounds,
    setNumberOfPlayers,
    setPlayersName,
} = gameSlice.actions;