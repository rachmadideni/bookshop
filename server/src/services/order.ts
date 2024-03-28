import { In } from "typeorm";
import { OrderRepo } from "../repositories/order";
import { OrderDetailsRepo } from "../repositories/orderDetails";
import { CustomerRepo } from "../repositories/customer";
import { BookRepo } from "../repositories/book";
import { CreateOrderDto, MakePaymentDto } from "../dto/order.dto";
import { BadRequestError, NotFoundError } from "../utils/api-error";
import { OrderDetails } from "../entities/orderDetails";
import { OrderStatus } from "../entities/order";
import { updateCustomerPointService } from "./customer";

export const getCustomerOrdersService = async (customerId: string) => {
  return await OrderRepo.find({
    relations: {
      orderDetails: {
        book: true,
      },
    },
    where: {
      customerId: customerId,
      status: OrderStatus.ORDER,
    },
  });
};

export const createOrderService = async (order: CreateOrderDto) => {
  const customer = await CustomerRepo.findOne({
    where: {
      id: order.customerId,
    },
  });

  if (!customer) throw new NotFoundError("Customer not found");

  const orderResult = await OrderRepo.save({
    customerId: order.customerId,
  });

  order.books.forEach(async (book) => {
    const checkbook = await BookRepo.findOne({
      where: {
        id: book.id,
      },
    });

    if (!checkbook) throw new NotFoundError("Book not found");
    const details = new OrderDetails();
    details.book = book;
    details.order = orderResult;
    OrderDetailsRepo.save(details);

    if (!details) throw new BadRequestError("cant save details");
  });
};

export const cancelOrderService = async (
  customerId: string,
  orderIds: string[]
) => {
  const orderData = await OrderRepo.find({
    where: {
      customerId,
      status: OrderStatus.ORDER,
      id: In(orderIds),
    },
  });

  if (!orderData) throw new NotFoundError("Order not found");

  const updatedOrders = await Promise.all(
    orderData.map(async (order) => {
      order.status = OrderStatus.CANCELLED;
      return await OrderRepo.save(order);
    })
  );

  return updatedOrders;
};

export const makePaymentOrderService = async (
  customerId: string,
  body: MakePaymentDto
) => {
  body.orderIds.forEach(async (orderId) => {
    const order = await OrderRepo.findOne({
      where: {
        id: orderId,
        customerId: customerId,
        status: OrderStatus.ORDER,
      },
    });

    if (!order) throw new NotFoundError("Order not found");

    order.status = OrderStatus.FULLFILLED;
    await OrderRepo.save(order);
  });

  return await updateCustomerPointService(customerId, body.amount);
};
