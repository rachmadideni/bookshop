import { IsUUID, IsNotEmpty, IsString, IsArray } from "class-validator";

export class CustomerOrderDto {
  @IsNotEmpty()
  @IsUUID()
  @IsString()
  customerId: string;
}

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  customerId: string;

  @IsArray()
  books: string[];
}
