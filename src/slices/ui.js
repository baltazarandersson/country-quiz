import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  inGame: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleLoader: (state) => {
      state.loading = !state.loading;
    },
    toggleInGame: (state) => {
      state.inGame = !state.inGame;
    },
  },
});

export const { toggleLoader, toggleInGame } = uiSlice.actions;
export default uiSlice.reducer;
