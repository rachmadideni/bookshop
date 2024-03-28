"use client";

import { createSlice } from "@reduxjs/toolkit/react";
import type { PayloadAction } from "@reduxjs/toolkit";
import { type RootState } from "@/store";

export interface IBookState {
  filterRequest: {
    category?: string;
    keyword?: string;
  };
}

const initialState: IBookState = {
  filterRequest: {
    category: "",
    keyword: "",
  },
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setFilterRequest: (
      state,
      action: PayloadAction<IBookState["filterRequest"]>
    ) => {
      state.filterRequest.category = action.payload.category;
      state.filterRequest.keyword = action.payload.keyword;
    },
  },
});

export const { setFilterRequest } = bookSlice.actions;
export const bookSelector = (state: RootState) => state.book;
export default bookSlice.reducer;
