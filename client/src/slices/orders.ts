import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { type RootState } from "@/store";

interface IOrdersState {
  isDialogOpen: boolean;
  orders: string[];
  payments: {
    orderIds: string[];
    amount: number;
    customerId: string;
  };
  cancelOrders: {
    customerId: string;
    orderIds: string[];
  };
}

const initialState: IOrdersState = {
  isDialogOpen: false,
  orders: [],
  payments: {
    orderIds: [],
    amount: 0,
    customerId: "",
  },
  cancelOrders: {
    customerId: "",
    orderIds: [],
  },
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    toggleDialog: (state, action) => {
      state.isDialogOpen = action.payload;
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setPayments: (state, action: PayloadAction<IOrdersState["payments"]>) => {
      state.payments = action.payload;
    },
    resetPayments: (state) => {
      state.payments = initialState.payments;
    },
    cancelOrders: (
      state,
      action: PayloadAction<IOrdersState["cancelOrders"]>
    ) => {
      state.cancelOrders = action.payload;
    },
    resetCancelOrders: (state) => {
      state.cancelOrders = initialState.cancelOrders;
    },
  },
});

export const {
  toggleDialog,
  setOrders,
  setPayments,
  resetPayments,
  cancelOrders,
  resetCancelOrders,
} = ordersSlice.actions;

export const ordersSelector = (state: RootState) => state.orders;

export default ordersSlice.reducer;
