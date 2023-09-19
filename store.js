//DONT FORGET = npm i react-redux @reduxjs/toolkit
import { configureStore } from "@reduxjs/toolkit";
import reservationReducer from "./features/reservationSlice";
import loginReducer from "./features/loginSlice";
import restaurantReducer from "./features/restaurantSlice";

export const store = configureStore({
  reducer: {
    reservation: reservationReducer,
    login: loginReducer,
    restaurant: restaurantReducer,
  },
});
