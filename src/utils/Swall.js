import Swal from "sweetalert2";

export const successAlert = (title, text) => {
  Swal.fire({
    title,
    text,
    icon: "success",
    confirmButtonText: "Oke",
  });
};

export const errorAlert = (title, text) => {
  Swal.fire({
    title,
    text,
    icon: "error",
    confirmButtonText: "Oke",
  });
};

export const confirmAlert = (title, text, callback) => {
  Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya",
    cancelButtonText: "Batal",
  }).then((result) => {
    if (result.isConfirmed) callback();
  });
};
