import countriesReducer from "../slices/countries";
import uiReducer from "../slices/ui";

const rootReducer = {
  countries: countriesReducer,
  ui: uiReducer,
};

export default rootReducer;
