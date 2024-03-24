import { CustomerRepo } from "@/repositories/customer";
import { NotFoundError } from "@/utils/api-error";

const getCustomers = async () => {
  return await CustomerRepo.find();
};

const getCustomerPoints = async (id: string) => {
  return await CustomerRepo.findOne({
    select: ["points"],
    where: {
      id,
    },
  });
};

const updateCustomerPoints = async (customerId: string, points: number) => {
  const customer = await CustomerRepo.findOne({
    where: {
      id: customerId,
    },
  });

  if (!customer) throw new NotFoundError("Customer not found");

  return await CustomerRepo.save({
    id: customer.id,
    points,
  });
};

export { getCustomers, getCustomerPoints, updateCustomerPoints };
