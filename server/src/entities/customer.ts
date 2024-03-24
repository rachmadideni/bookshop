import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("customer")
export class Customer {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({
    default: 0,
  })
  points: number;
}
