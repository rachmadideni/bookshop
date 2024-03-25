import { OrderRepo } from "../repositories/order";
import { OrderDetailsRepo } from "../repositories/orderDetails";
import { CustomerRepo } from "../repositories/customer";
import { BookRepo } from "../repositories/book";
import { CreateOrderDto } from "../dto/order.dto";
import { NotFoundError } from "../utils/api-error";
import { OrderDetails } from "../entities/orderDetails";
import { OrderStatus } from "../entities/order";

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
        id: book,
      },
    });

    if (!checkbook) throw new NotFoundError("Book not found");
    const details = new OrderDetails();
    details.book = checkbook;
    details.order = orderResult;
    OrderDetailsRepo.save(details);
  });
};

export const cancelOrderService = async (orderId: string) => {
  const order = await OrderRepo.findOne({
    where: {
      id: orderId,
    },
  });

  if (!order) throw new NotFoundError("Order not found");

  order.status = OrderStatus.CANCELLED;
  return await OrderRepo.save(order);
};
