import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


export const toastSuccess = (message) => {
    toast.success(message, {
    position: toast.POSITION.TOP_CENTER
  });
};

export const toastError = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER
    });
};
