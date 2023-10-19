import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartReducer";
import { createStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
      cart: cartReducer
      // Add other reducers if needed
    },
    // Add middleware, devTools, etc. as needed
  });

export default store;