import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { Tag } from "./tag";
import { OrderDetails } from "./orderDetails";

@Entity("book")
export class Book {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  writer: string;

  @Column({
    name: "cover_image",
  })
  coverImage: string;

  @Column({
    type: "real",
  })
  price: string;

  @ManyToMany(() => Tag, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinTable({
    name: "book_tag",
    joinColumn: {
      name: "book_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "tag_id",
      referencedColumnName: "id",
    },
  })
  tags: Tag[];

  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.book)
  details: OrderDetails[];
}
