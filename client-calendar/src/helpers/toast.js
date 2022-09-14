import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const errorHandler = (err, navigate) => {
  if (err === "Invalid token") {
    localStorage.clear();
    navigate("/login");
  }
  toast.error(err, {
    theme: "colored",
    position: "bottom-right",
    pauseOnHover: false,
    autoClose: 1000,
  });
};

export const success = (data) => {
  console.log(data);
  toast.success(data.message, {
    theme: "colored",
    position: "bottom-right",
    pauseOnHover: false,
    autoClose: 1000,
  });
};
