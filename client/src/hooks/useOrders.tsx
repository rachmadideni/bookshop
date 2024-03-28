"use client";

import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "@/hooks";
import { userSelector } from "@/slices/user";
import { baseUrl } from "@/lib/config";

const getOrders = async (customerId: string) => {
  const url = `${baseUrl}/order/${customerId}/customer`;
  const response = await fetch(url);
  return await response.json();
};

const useOrders = () => {
  const { user } = useSelector(userSelector);
  const orders = useQuery({
    queryKey: ["getOrders", user.customerId],
    queryFn: () => getOrders(user.customerId),
    enabled: Boolean(user?.customerId),
    refetchOnWindowFocus: true,
  });

  return orders;
};

export default useOrders;
