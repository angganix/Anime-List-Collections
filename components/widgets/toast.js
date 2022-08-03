import Swal from "sweetalert2";

const toast = (type = "success", message) => {
  return Swal.fire({
    icon: type,
    toast: true,
    position: "bottom",
    text: message,
    timer: 4000,
    showConfirmButton: false,
  });
};

export default toast;
