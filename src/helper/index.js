import Swal from "sweetalert2";

export const notifyError = (title, detail) => {
  Swal.fire({
    title: title,
    text: detail,
    icon: "error",
    cancelButtonColor: "#ff2b53",
    confirmButtonColor: "#ff2b53",
  });
};

export const notifySuccess = (title, detail) => {
  Swal.fire({
    title: title,
    text: detail,
    icon: "success",
    cancelButtonColor: "#ff2b53",
    confirmButtonColor: "#ff2b53",
  });
};

export const notifyWarning = (title, detail) => {
  Swal.fire({
    title: title,
    text: detail,
    icon: "warning",
    cancelButtonColor: "#ff2b53",
    confirmButtonColor: "#ff2b53",
  });
};

export const notifyInfo = (title, detail) => {
  Swal.fire({
    title: title,
    text: detail,
    icon: "info",
    showCancelButton: false,
    showConfirmButton: false,
  });
};
