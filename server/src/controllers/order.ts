import * as express from "express";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "@/utils/api-error";
import {
  getCustomerOrdersService,
  createOrderService,
  cancelOrderService,
} from "@/services/order";
import RequestValidator from "@/utils/request-validator";
import { CreateOrderDto, CustomerOrderDto } from "@/dto/order.dto";

const router = express.Router();

export const createOrder = router.post(
  "/order",
  RequestValidator.validate(CreateOrderDto),
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    /*
    #swagger.tags = ['orders']
    #swagger.summary = 'create customer order'
    
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json":{
          schema: {
            $ref: "#/components/schemas/orderSchema"
          }
        }
      }
    }
     */

    try {
      const books = req.body.books as CreateOrderDto["books"];
      const customerId = req.body.customerId as CreateOrderDto["customerId"];
      const order = await createOrderService({ customerId, books });
      res.json({ message: "Order created!", data: order });
    } catch (err) {
      if (err.statusCode === StatusCodes.NOT_FOUND) {
        next(new NotFoundError(err.message));
      }
    }
  }
);

export const getCustomerOrders = router.get(
  "/order/:customerId/customer",
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    /*
    #swagger.tags = ['orders']
    #swagger.summary = 'get orders by customer id'
    
    #swagger.parameters['customerId'] = {
      in: 'path',
      description: 'Some description...'
     }
    */
    const customerId = req.params.customerId as CustomerOrderDto["customerId"];
    const orders = await getCustomerOrdersService(customerId);
    res.json({ message: "succesfully get customer orders", data: orders });
  }
);

export const cancelOrder = router.post(
  "/order/:orderId/cancel",
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    /*
    #swagger.tags = ['orders']    
    #swagger.summary = 'cancel orders'
    #swagger.parameters['orderId'] = {
      in: 'path',
      description: 'Some description...'
     }
    */

    try {
      const orderId = req.params.orderId;
      const cancelledOrder = await cancelOrderService(orderId);
      res.json({
        message: "Order has been cancelled successfully",
        data: cancelledOrder,
      });
    } catch (err) {
      if (err.statusCode === StatusCodes.NOT_FOUND) {
        next(new NotFoundError(err.message));
      }
    }
  }
);
