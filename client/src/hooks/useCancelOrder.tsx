"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { baseUrl } from "@/lib/config";
import { useSelector, useDispatch } from "@/hooks";
import { ordersSelector, resetCancelOrders } from "@/slices/orders";

const cancelRequest = async (customerId: string, orderIds: string[]) => {
  const url = `${baseUrl}/order/${customerId}/cancel`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      orderIds,
    }),
  });
  return response.json();
};

const useCancelOrder = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { cancelOrders } = useSelector(ordersSelector);

  const mutation = useMutation({
    mutationKey: ["cancelOrder"],
    mutationFn: () =>
      cancelRequest(cancelOrders.customerId, cancelOrders.orderIds),
    onSuccess: (props) => {
      if (!props.status) {
        toast.error(props.message, {
          position: "top-right",
        });
        return;
      }
      toast.success(props.message);
      dispatch(resetCancelOrders());
      queryClient.invalidateQueries({ queryKey: ["getOrders"] });
    },
    onError: (props) => {
      toast.error(props.message, {
        position: "top-right",
      });
      dispatch(resetCancelOrders());
    },
  });
  return mutation;
};

export default useCancelOrder;
