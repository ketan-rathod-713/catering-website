import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartReducer";
import orderReducer from "./order/orderReducer";

const store = configureStore({
    reducer: {
      cart: cartReducer,
      order: orderReducer
      // Add other reducers if needed
    },
    // Add middleware, devTools, etc. as needed
  });

export default store;