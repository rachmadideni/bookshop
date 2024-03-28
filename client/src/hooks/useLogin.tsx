"use client";

import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "@/hooks";
import { login, setOpenLoginModal } from "@/slices/user";
import { setNotification } from "@/slices/global";
import { baseUrl } from "@/lib/config";

const loginRequest = async () => {
  const url = `${baseUrl}/auth/login`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

const useLogin = () => {
  const dispatch = useDispatch();
  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: () => loginRequest(),
    onSuccess: (props) => {
      dispatch(
        login({
          customerId: props.data.id,
          name: props.data.name,
          points: props.data.points,
        })
      );
      dispatch(setOpenLoginModal(false));
      dispatch(
        setNotification({
          isOpen: true,
          message:
            "Welcome to Bookshop! 🎉 As our new customer you'll receive 100 bonus points 🎉",
        })
      );
    },
    onError: (err) => {
      alert(err);
    },
  });
  return mutation;
};

export default useLogin;
