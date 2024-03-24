import { setSeederFactory } from "typeorm-extension";
import { Customer } from "@/entities/customer";

export const CustomerFactory = setSeederFactory(Customer, () => {
  const customer = new Customer();
  customer.name = "dummy-user";
  return customer;
});
