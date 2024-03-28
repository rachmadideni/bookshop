import {
  getBookDetail,
  // getBooks,
  getBookByTag,
  filterBooksByCategory,
} from "./book";
import { getCustomerPoints, updateCustomerPoints } from "./customer";
import {
  getCustomerOrders,
  createOrder,
  cancelOrder,
  makePayment,
} from "./order";
import { login } from "./auth";

const appRoutes = [
  // getBooks,
  getBookDetail,
  getBookByTag,
  getCustomerPoints,
  updateCustomerPoints,
  filterBooksByCategory,
  getCustomerOrders,
  createOrder,
  cancelOrder,
  // makePayment,
  login,
];

export default appRoutes;
