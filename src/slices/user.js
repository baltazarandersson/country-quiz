import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: "EN",
  difficulty: 1,
  points: 0,
  remainingLives: 5,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    increasePoints: (state) => {
      state.points = state.points + 1;
    },
    resetPoints: (state) => {
      state.points = 0;
    },
    setDifficulty: (state, action) => {
      state.difficulty = action.payload;
    },
    decreaseLives: (state) => {
      state.remainingLives = state.remainingLives - 1;
    },
    resetLives: (state) => {
      state.remainingLives = 5;
    },
  },
});

export const {
  setLanguage,
  increasePoints,
  resetPoints,
  setDifficulty,
  decreaseLives,
  resetLives,
} = userSlice.actions;
export default userSlice.reducer;
