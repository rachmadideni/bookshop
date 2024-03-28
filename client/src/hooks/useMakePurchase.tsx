"use client";

import { useMutation } from "@tanstack/react-query";
import { useSelector, useDispatch } from "@/hooks";
import { cartSelector, type ICartState } from "@/slices/cart";
import { userSelector } from "@/slices/user";
import { toast } from "sonner";
import { baseUrl } from "@/lib/config";

const purchase = async (items: ICartState["items"], customerId: string) => {
  const url = `${baseUrl}/order`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      customerId,
      books: items,
    }),
  });
  return response.json();
};

const useMakePurchase = () => {
  const { items } = useSelector(cartSelector);
  const { user } = useSelector(userSelector);

  //   const dispatch = useDispatch();

  const mutation = useMutation({
    mutationKey: ["purchase", items, user.customerId],
    mutationFn: () => purchase(items, user.customerId),
    onSuccess: (props) => {
      if (!props.status) {
        let errors = [props.message];
        // let errors = [props.message, ...props.errors];
        toast.error(
          errors.map((err) => err),
          {
            position: "top-right",
          }
        );
        return;
      }

      let errors = [...props.errors];

      //   toast(
      //     <div className="flex flex-col">
      //       <div>{props.message}</div>
      //       <div className="block">
      //         {errors.map((err) => (
      //           <p>{err}</p>
      //         ))}
      //       </div>
      //     </div>,
      //     {
      //       position: "top-right",
      //     }
      //   );

      //   toast(props.message, {
      //     description: errors.map((err) => err),
      //     descriptionClassName: "flex flex-col",
      //     position: "top-right",
      //   });
      //   dispatch({ type: "CLEAR_CART" });
    },
    onError: (props) => {
      toast.error(props.message);
    },
  });

  return mutation;
};

export default useMakePurchase;
