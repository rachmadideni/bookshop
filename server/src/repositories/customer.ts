import { dataSource } from "../config/database";
import { Customer } from "../entities/customer";

export const CustomerRepo = dataSource.getRepository(Customer).extend({
  findByName(name: string) {
    return this.createQueryBuilder("customer")
      .where("customer.name = :name", { name })
      .getMany();
  },
});
