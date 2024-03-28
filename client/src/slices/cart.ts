import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { type RootState } from "@/store";
import { type BookProps } from "@/components/book/book.types";

export interface ICartState {
  isOpen: boolean;
  items: BookProps[];
}

const initialState: ICartState = {
  isOpen: false,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    addCartItems: (state, action: PayloadAction<BookProps>) => {
      //   check current item in cart
      const itemExist = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (itemExist) return;
      state.items.push(action.payload);
    },
    removeCartItems: (state, action: PayloadAction<BookProps["id"]>) => {
      const itemExist = state.items.find((item) => item.id === action.payload);
      if (!itemExist) return;
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    resetItems: (state) => {
      state.items = [];
    },
  },
});

export const { addCartItems, removeCartItems, toggleCartOpen, resetItems } =
  cartSlice.actions;
export const cartSelector = (state: RootState) => state.cart;
export const totalItemsSelector = (state: RootState) => state.cart.items.length;
export default cartSlice.reducer;
