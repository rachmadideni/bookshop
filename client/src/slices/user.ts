"use client";

import { createSlice } from "@reduxjs/toolkit/react";
import type { PayloadAction } from "@reduxjs/toolkit";
import { type RootState } from "@/store";

interface IUserState {
  isLogin: boolean;
  openLoginModal: boolean;
  user: {
    customerId: string;
    name: string;
    points: number;
  };
}

const initialState: IUserState = {
  isLogin: false,

  openLoginModal: false,
  user: {
    customerId: "",
    name: "",
    points: 0,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUserState["user"]>) => {
      state.isLogin = true;
      state.user.customerId = action.payload.customerId;
      state.user.name = action.payload.name;
      state.user.points = action.payload.points;
    },
    logout: (state) => {
      state.isLogin = false;
    },
    addPoints: (state, action: PayloadAction<number>) => {
      state.user.points += action.payload;
    },
    deductPoints: (state, action: PayloadAction<number>) => {
      state.user.points -= action.payload;
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
