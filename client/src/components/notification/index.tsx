"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "@/hooks";
import { setNotification } from "@/slices/global";
import { Button } from "../button";
import { CircleXIcon } from "lucide-react";

type NotificationProps = {
  closeTimeout?: number;
};

const Notification = ({ closeTimeout = 5000 }: NotificationProps) => {
  const dispatch = useDispatch();
  const { isOpen, message } = useSelector(
    (state) => state.global.notifications
  );

  const onClose = () => {
    dispatch(
      setNotification({
        isOpen: false,
        message: "",
      })
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isOpen)
        dispatch(
          setNotification({
            isOpen: false,
            message: "",
          })
        );
    }, closeTimeout);

    return () => clearTimeout(timer);
  }, [isOpen, closeTimeout, dispatch]);

  if (!isOpen) return null;
  return (
    <div className="absolute top-0 flex w-full h-10 p-2 z-10  space-x-2 bg-gradient-to-r from-blue-800 to-indigo-900 justify-between items-center">
      <div className="flex w-full items-center justify-center">
        <p className="text-white text-center text-xs font-normal font-poppins">
          {message}
        </p>
      </div>
      <Button className="text-white p-0" onClick={onClose}>
        <CircleXIcon size={20} />
      </Button>
    </div>
  );
};

export default Notification;
