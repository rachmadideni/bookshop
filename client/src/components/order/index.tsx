import { useState, useEffect } from "react";
import Image from "next/image";
import { useQueryClient, focusManager } from "@tanstack/react-query";
import { CircleXIcon, CheckCircle2Icon } from "lucide-react";
import {
  AlertDialog as Dialog,
  AlertDialogHeader as DialogHeader,
  AlertDialogContent as DialogContent,
} from "@/components/dialog";
import { Button } from "@/components/button";
import { useSelector, useDispatch } from "@/hooks";
import useOrders from "@/hooks/useOrders";
import useCancelOrder from "@/hooks/useCancelOrder";
import useMakePayment from "@/hooks/useMakePayment";
import {
  ordersSelector,
  toggleDialog,
  setPayments,
  cancelOrders,
} from "@/slices/orders";
import { userSelector } from "@/slices/user";
import { cn } from "@/lib/utils";

interface OrderIdsState {
  [orderId: string]: number;
}

const OrderHistory = () => {
  const dispatch = useDispatch();

  const [orderIds, setOrderIds] = useState<OrderIdsState>({});
  const [amount, setAmount] = useState<number>(0);
  const { isDialogOpen } = useSelector(ordersSelector);
  const { user } = useSelector(userSelector);
  const orders = useOrders();
  const makeCancelOrders = useCancelOrder();
  const makePayment = useMakePayment();
  const queryClient = useQueryClient();

  type BookDetailProps = {
    price: string;
    title: string;
    writer: string;
  };

  type BookProps = {
    book: BookDetailProps;
  };

  type orderProps = {
    id: string;
    orderDetails: BookProps[];
  };

  const getTotal = () => {
    return (
      orders?.data?.data?.reduce((acc: number, order: orderProps) => {
        return (
          acc +
          order?.orderDetails.reduce((orderAcc: number, detail: BookProps) => {
            return orderAcc + parseInt(detail.book.price);
          }, 0)
        );
      }, 0) || 0
    );
  };

  const handleOrderIds = (orderId: string) => {
    const amount = orders?.data?.data
      ?.find((order: orderProps) => order.id === orderId)
      .orderDetails.reduce((orderAcc: number, detail: BookProps) => {
        return orderAcc + parseInt(detail.book.price);
      }, 0);

    setOrderIds((prevOrderIds) => {
      const newOrderIds = { ...prevOrderIds };
      if (newOrderIds[orderId]) {
        delete newOrderIds[orderId];
      } else {
        newOrderIds[orderId] = amount;
      }
      return newOrderIds;
    });
  };

  useEffect(() => {
    const sum = Object.values(orderIds).reduce(
      (acc, amount) => acc + amount,
      0
    );
    setAmount(sum);
  }, [orderIds]);

  useEffect(() => {
    if (isDialogOpen) {
      // always fetch fresh orders data
      queryClient.invalidateQueries({ queryKey: ["getOrders"] });
    }
  }, [isDialogOpen, queryClient]);

  if (orders.isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <Dialog open={isDialogOpen}>
      <DialogContent className="w-[85%] rounded-lg bg-white">
        <DialogHeader>
          <h1 className="text-xl font-bold font-inter">My Orders</h1>
          <Button
            className="absolute top-0 -right-1"
            onClick={() => {
              focusManager.setFocused(undefined);
              dispatch(toggleDialog(false));
              setAmount(0);
              setOrderIds({});
            }}
          >
            <CircleXIcon size={20} />
          </Button>
        </DialogHeader>
        {getTotal() === 0 && (
          <div className="flex w-full justify-center">
            <p className="text-black">No Orders</p>
          </div>
        )}
        <div className="flex flex-col gap-4 max-w-lg justify-start overflow-y-scroll bg-slate-400/0">
          {orders?.data?.data?.length > 0 &&
            orders?.data?.data?.map((order: orderProps, idx: number) => (
              <div key={idx} className="flex flex-col w-full space-y-2">
                <div className="flex mb-1 items-center justify-between px-2">
                  <p className="text-sm text-black font-semibold">
                    Order id : {order.id}
                  </p>
                  <Button
                    variant={"outline"}
                    size={"sm"}
                    className="text-green-600"
                    onClick={() => handleOrderIds(order.id)}
                  >
                    {orderIds[order.id] ? "Unselect" : "Select"}
                  </Button>
                </div>

                {order?.orderDetails.map((detail: BookProps, idx: number) => (
                  <div
                    key={idx}
                    className={cn(
                      `flex w-full gap-2 justify-start border p-2 border-gray-200 rounded-md shadow-sm `,
                      orderIds[order.id] && "border-green-600"
                    )}
                  >
                    <div className="flex w-full gap-4">
                      <Image
                        src="https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg"
                        alt={detail.book.title}
                        className="w-24 h-24 aspect-auto"
                        width={40}
                        height={40}
                      />
                      <div className="flex flex-col w-full items-start justify-start">
                        <p className="text-md font-semibold text-left leading-tight capitalize">
                          {detail.book.title}
                        </p>
                        <p className="text-xs text-black">
                          By {detail.book.writer}
                        </p>
                      </div>
                      <div className="flex flex-col w-full">
                        <p className="text-md font-bold">
                          ${detail.book.price}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-6 grow-0 justify-end">
                      {orderIds[order.id] && (
                        <CheckCircle2Icon
                          size={20}
                          className="text-green-600"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>
        <div className="space-y-2">
          <div className="flex justify-end">
            <p className="text-black font-semibold">Total : ${amount}</p>
          </div>
          <Button
            variant="outline"
            className="w-full bg-green-600 text-white capitalize disabled:cursor-not-allowed"
            disabled={amount > user.points || amount === 0 ? true : false}
            onClick={() => {
              // make payment for orders
              dispatch(
                setPayments({
                  orderIds: Object.keys(orderIds),
                  amount,
                  customerId: user.customerId,
                })
              );
              makePayment.mutate();
            }}
          >
            {amount > user.points ? "insufficent points" : "make payment"}
          </Button>
          <Button
            variant="outline"
            className="w-full border-red-600 text-red-500 capitalize"
            onClick={() => {
              // cancel orders
              dispatch(
                cancelOrders({
                  orderIds: Object.keys(orderIds),
                  customerId: user.customerId,
                })
              );

              makeCancelOrders.mutate();
            }}
            disabled={amount === 0 ? true : false}
          >
            cancel order
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderHistory;
