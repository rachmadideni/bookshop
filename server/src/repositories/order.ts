import { dataSource } from "../config/database";
import { Order } from "../entities/order";

export const OrderRepo = dataSource.getRepository(Order).extend({});
