import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsEnum } from "class-validator";
import { OrderDetails } from "./orderDetails";

export enum OrderStatus {
  ORDER = "order",
  CANCELLED = "cancelled",
  FULLFILLED = "fullfilled",
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    name: "customer_id",
  })
  customerId: string;

  @IsEnum(OrderStatus)
  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.ORDER,
  })
  status: OrderStatus;

  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.order, {
    onDelete: "CASCADE",
  })
  orderDetails: OrderDetails[];

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
  })
  updatedAt: Date;
}
