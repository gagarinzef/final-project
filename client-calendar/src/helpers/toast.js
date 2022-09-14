import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function text(err) {
  return (
    <div>
      {[err].map((el, idx) => (
        <p key={idx}>{el}</p>
      ))}
    </div>
  );
}

export const errorHandler = (err, navigate) => {
  if (err[0] === "Invalid token") {
    localStorage.clear();
    navigate("/login");
  }
  toast.error(text(err), {
    theme: "colored",
    position: "bottom-right",
    pauseOnHover: false,
    autoClose: 1000,
  });
};

export const success = (data) => {
  toast.success(data.message, {
    theme: "colored",
    position: "bottom-right",
    pauseOnHover: false,
    autoClose: 1000,
  });
};
