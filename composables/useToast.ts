import { toast, type ToastOptions } from "vue3-toastify";

export function useToast() {
  const notify = (message: string, type: "success" | "error") => {
    const options: ToastOptions = {
      autoClose: 3000,
      position: toast.POSITION.TOP_RIGHT,
      pauseOnHover: true,
      transition: "slide",
      progressStyle: {
        background: type === "success" ? "purple" : "red",
      },
    };

    toast(message, options);
  };

  return { notify };
}
