"use client";

import { useMutation } from "@tanstack/react-query";
import { baseUrl } from "@/lib/config";
import { useSelector, useDispatch } from "@/hooks";
import { userSelector } from "@/slices/user";
import { ordersSelector, resetPayments } from "@/slices/orders";
import { toast } from "sonner";

const makePayment = async (
  orderIds: string[],
  amount: number,
  customerId: string
) => {
  const url = `${baseUrl}/order/${customerId}/payment`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount,
      orderIds,
    }),
  });
  return response.json();
};

const useMakePayment = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);
  const { payments } = useSelector(ordersSelector);

  const remainingAmount = user.points - payments.amount;

  const mutation = useMutation({
    mutationKey: ["makePayment"],
    mutationFn: () =>
      makePayment(payments.orderIds, remainingAmount, user.customerId),
    onSuccess: (props) => {
      toast.success(props.message, {
        position: "top-right",
      });

      dispatch(resetPayments());
    },
    onError: (props) => {
      toast.error(props.message, {
        position: "top-right",
      });
      dispatch(resetPayments());
    },
  });

  return mutation;
};

export default useMakePayment;
