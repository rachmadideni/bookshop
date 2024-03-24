import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Order } from "./order";
import { Book } from "./book";
@Entity()
export class OrderDetails {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => Book)
  @JoinColumn({ name: "book_id" })
  book: Book;

  @ManyToOne(() => Order, (order) => order.orderDetails, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "order_id" })
  order: Order;
}
