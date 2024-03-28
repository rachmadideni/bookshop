import * as express from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../utils/api-error";
import {
  getCustomerOrdersService,
  createOrderService,
  cancelOrderService,
  makePaymentOrderService,
} from "../services/order";
import RequestValidator from "../utils/request-validator";
import {
  CreateOrderDto,
  CustomerOrderDto,
  MakePaymentDto,
} from "../dto/order.dto";

const router = express.Router();

export const makePayment = router.post(
  "/order/:customerId/payment",
  RequestValidator.validate(MakePaymentDto),
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    /*
    #swagger.tags = ['orders']    
    #swagger.summary = 'make orders payment'
    #swagger.parameters['customerId'] = {
      in: 'path',
      description: 'Customer Id'
     }
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json":{
          schema: {
            $ref: "#/components/schemas/paymentSchema"
          }
        }
      }
    }
    */

    try {
      const customerId = req.params.customerId;
      const body = req.body;
      const payment = await makePaymentOrderService(customerId, body);
      res.json({
        message: "Payment has been made successfully",
        data: payment,
      });
    } catch (err) {
      if (err.statusCode === StatusCodes.NOT_FOUND) {
        next(new NotFoundError(err.message));
      }
    }
  }
);

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
      const body = req.body;
      const order = await createOrderService(body);
      res.json({ message: "Order created!", data: order });
    } catch (err) {
      if (err.statusCode === StatusCodes.NOT_FOUND) {
        next(new NotFoundError(err.message));
      } else if (err.statusCode === StatusCodes.BAD_REQUEST) {
        next(new BadRequestError(err.message));
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
  "/order/:customerId/cancel",
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    /*
    #swagger.tags = ['orders']    
    #swagger.summary = 'cancel orders'
    #swagger.parameters['customerId'] = {
      in: 'path',
      description: 'Some description...'
     }
     #swagger.requestBody = {
      required: true,
      content: {
        "application/json":{
          schema: {
            $ref: "#/components/schemas/cancelOrderSchema"
          }
        }
      }
    }
    */

    try {
      const customerId = req.params.customerId;
      const orderIds = req.body.orderIds;
      const cancelledOrder = await cancelOrderService(customerId, orderIds);
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
