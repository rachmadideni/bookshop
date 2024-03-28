import { IsUUID, IsNotEmpty, IsString, IsArray } from "class-validator";
import { Book } from "@/entities/book";

export class CustomerOrderDto {
  @IsNotEmpty()
  @IsUUID()
  @IsString()
  customerId: string;
}

export class CreateOrderDto {
  // @IsUUID()
  @IsNotEmpty()
  customerId: string;

  @IsArray()
  books: Book[];
}

export class MakePaymentDto {
  amount: number;

  orderIds: string[];
}
