import { dataSource } from "../config/database";
import { OrderDetails } from "../entities/orderDetails";

export const OrderDetailsRepo = dataSource
  .getRepository(OrderDetails)
  .extend({});
