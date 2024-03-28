import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
  JoinColumn,
  Column,
} from "typeorm";
import { Order } from "./order";
import { Book } from "./book";
@Entity()
export class OrderDetails {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // @OneToOne(() => Book)
  // @JoinColumn({ name: "book_id" })
  // book: Book;

  @ManyToOne(() => Book, (book) => book.id)
  @JoinColumn({ name: "book_id" })
  // @Column({
  //   name: "book_id",
  // })
  book: Book;

  @ManyToOne(() => Order, (order) => order.orderDetails, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "order_id" })
  order: Order;
}
