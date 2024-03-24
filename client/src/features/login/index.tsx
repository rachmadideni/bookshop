import {
  AlertDialog as Dialog,
  AlertDialogTrigger as DialogTrigger,
  AlertDialogContent as DialogContent,
} from "@/components/dialog";

import { Button } from "@/components/button";

type LoginProps = {
  isOpen: boolean;
  openModal?: (evt: React.MouseEvent) => void;
  onLogin?: (evt: React.MouseEvent) => void;
  onCancel?: (evt: React.MouseEvent) => void;
  triggerComponent?: React.ReactNode;
};

const Login = ({
  isOpen,
  openModal,
  onLogin,
  onCancel,
  triggerComponent,
}: LoginProps) => {
  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        {!triggerComponent ? (
          <a
            onClick={openModal}
            className="cursor-pointer bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-md text-black font-poppins"
          >
            Login
          </a>
        ) : (
          triggerComponent
        )}
      </DialogTrigger>
      <DialogContent className="bg-white">
        <div className="flex flex-col space-y-4 ">
          <div className="text-center space-y-4">
            <h3 className="text-black text-lg font-bold font-poppins">
              Login to Bookshop
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Use your Bookshop Account to purchase your favorite books
            </p>
            <Button
              className="w-full"
              variant="outline"
              type="button"
              onClick={onLogin}
            >
              Log in
            </Button>
            <Button
              className="w-full text-red-500"
              variant="outline"
              type="button"
              onClick={onCancel}
            >
              cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
