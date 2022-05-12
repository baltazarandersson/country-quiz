import userReducer from "../slices/user";
import countriesReducer from "../slices/countries";
import uiReducer from "../slices/ui";

const rootReducer = {
  countries: countriesReducer,
  ui: uiReducer,
  user: userReducer,
};

export default rootReducer;
