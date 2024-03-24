"use client";

import { createSlice } from "@reduxjs/toolkit/react";
import type { PayloadAction } from "@reduxjs/toolkit";
import { type RootState } from "@/store";

interface IUserState {
  isLogin: boolean;
  points: number;
  openLoginModal: boolean;
}

const initialState: IUserState = {
  isLogin: false,
  points: 0,
  openLoginModal: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      state.isLogin = true;
    },
    logout: (state) => {
      state.isLogin = false;
    },
    addPoints: (state, action: PayloadAction<number>) => {
      state.points += action.payload;
    },
    deductPoints: (state, action) => {
      state.points -= action.payload;
    },
    setOpenLoginModal: (state, action: PayloadAction<boolean>) => {
      state.openLoginModal = action.payload;
    },
  },
});

export const { login, logout, addPoints, deductPoints, setOpenLoginModal } =
  userSlice.actions;
export const userSelector = (state: RootState) => state.user;
export default userSlice.reducer;
