import React from "react";
import ReactDOM from "react-dom/client";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";

const store = configureStore(
  {
    reducer: rootReducer,
  },
  applyMiddleware(thunk)
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
