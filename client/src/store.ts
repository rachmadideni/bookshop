"use client";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import user from "./slices/user";
import global from "./slices/global";

const rootReducer = combineReducers({
  user,
  global,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === "development",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
