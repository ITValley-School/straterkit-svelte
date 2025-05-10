import Swal from "sweetalert2";

export const confirmSwal = async (title, text, icon, callback) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success parameter-button",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons
    .fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        callback();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return false;
      }
    });
};
