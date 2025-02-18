import { toast } from "react-toastify";

export const successToast = (message: string) => {
  return toast.success(message);
};
