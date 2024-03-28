import { CustomerRepo } from "../repositories/customer";
import { updateCustomerPointService } from "./customer";
import { NotFoundError } from "../utils/api-error";

const login = async () => {
  const user = await CustomerRepo.findOne({
    where: {
      name: "dummy-user",
    },
  });
  if (!user) throw new NotFoundError("Customer not found");
  const userWithPoints = await updateCustomerPointService(user.id, 100);
  if (userWithPoints.points !== 100) throw new Error("Points not updated");

  return userWithPoints;
};

export { login as loginService };
