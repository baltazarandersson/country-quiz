import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toggleLoader } from "./ui";

const initialState = {
  list: [],
};

export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async (_, { dispatch }) => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const countriesData = await response.json();
      const independentCountries = countriesData.filter(
        (country) => country.independent === true
      );
      dispatch(setCountries(independentCountries));
      dispatch(toggleLoader());
    } catch (error) {
      console.log(error.message);
      dispatch(toggleLoader());
    }
  }
);

export const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    setCountries: (state, action) => {
      state.list = action.payload;
    },
  },
});

export default countriesSlice.reducer;
export const { setCountries } = countriesSlice.actions;
