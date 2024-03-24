import {
  getBookDetail,
  getBooks,
  getBookByTag,
  filterBooksByCategory,
} from "./book";
import { getCustomerPoints, updateCustomerPoints } from "./customer";
import { getCustomerOrders, createOrder, cancelOrder } from "./order";

const appRoutes = [
  getBooks,
  getBookDetail,
  getBookByTag,
  getCustomerPoints,
  updateCustomerPoints,
  filterBooksByCategory,
  getCustomerOrders,
  createOrder,
  cancelOrder,
];

export default appRoutes;
