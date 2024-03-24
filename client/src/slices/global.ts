"use client";

import { createSlice } from "@reduxjs/toolkit/react";
import type { PayloadAction } from "@reduxjs/toolkit";
import { type RootState } from "@/store";

interface IGlobalState {
  notifications: {
    isOpen?: boolean;
    message?: string;
  };
}

const initialState: IGlobalState = {
  notifications: {
    isOpen: false,
    message: "",
  },
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setNotification: (
      state,
      action: PayloadAction<IGlobalState["notifications"]>
    ) => {
      state.notifications.isOpen = action.payload.isOpen;
      state.notifications.message = action.payload.message;
    },
  },
});

export const { setNotification } = globalSlice.actions;
export const globalSelector = (state: RootState) => state.global;
export default globalSlice.reducer;
