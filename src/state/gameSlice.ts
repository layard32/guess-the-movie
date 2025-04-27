import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { movieModel } from "./movieModel";
import { gameModeType, gameStatusType, gameType } from "./myTypes";

interface GameState {
    game: gameType;
    moviesFound: movieModel[];
    gameStatus: gameStatusType;
    gameMode: gameModeType;
    numberOfRounds: number;
    numberOfPlayers: number;
    playersName: string[];
    excludedGenres: string[];
    currentClipIndex: number;
}

const initialState: GameState = {
    game: "local",
    moviesFound: [],
    gameStatus: "waiting",
    gameMode: "singleplayer",
    numberOfRounds: 3,
    numberOfPlayers: 1,
    playersName: ["Player 1"],
    excludedGenres: [],
    currentClipIndex: 0,
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

            const newPlayerNames = Array.from({ length: action.payload }, (_, i) => `Player ${i + 1}`);
            newPlayerNames.forEach((_, index) => {
                // se l'utente ha già scritto un nome, lo manteniamo
                if (state.playersName[index] !== undefined) {
                    newPlayerNames[index] = state.playersName[index]; 
                }
            });
            state.playersName = newPlayerNames;
        },
        setPlayersName: (state, action: PayloadAction<string[]>) => {
            state.playersName = action.payload;
        },
        setExcludedGenres: (state, action: PayloadAction<string[]>) => {
            state.excludedGenres = action.payload;
        },
        setGame : (state, action: PayloadAction<gameType>) => {
            state.game = action.payload;
        },
        setCurrentClipIndex: (state, action: PayloadAction<number>) => {
            state.currentClipIndex = action.payload;
        },
    }
});

// esportiamo il reducer
export default gameSlice.reducer;

// esportiamo i selectors
export const selectGame = (state: any) => state.game.game;
export const selectMoviesFound = (state: any) => state.game.moviesFound;
export const selectGameStatus = (state: any) => state.game.gameStatus;
export const selectGameMode = (state: any) => state.game.gameMode;
export const selectNumberOfRounds = (state: any) => state.game.numberOfRounds;
export const selectNumberOfPlayers = (state: any) => state.game.numberOfPlayers;
export const selectPlayersName = (state: any) => state.game.playersName;
export const selectExcludedGenres = (state: any) => state.game.excludedGenres;
export const selectCurrentClipIndex = (state: any) => state.game.currentClipIndex;

// esportiamo le azioni
export const {
    setMoviesFound,
    setGameStatus,
    setGameMode,
    setNumberOfRounds,
    setNumberOfPlayers,
    setPlayersName,
    setGame,
    setExcludedGenres,
    setCurrentClipIndex,
} = gameSlice.actions;