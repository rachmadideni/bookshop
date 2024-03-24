import { IsUUID, IsNotEmpty, IsNumber } from "class-validator";

export class UpdatePointsDto {
  @IsUUID()
  @IsNotEmpty()
  customerId!: string;

  @IsNotEmpty()
  @IsNumber()
  points!: number;
}
