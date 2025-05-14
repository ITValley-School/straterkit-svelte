import Swal from "sweetalert2";

/**
 * Displays a SweetAlert2 confirmation dialog with custom styling and behavior.
 *
 * @param {string} title - The title of the confirmation dialog.
 * @param {string} text - The text content of the confirmation dialog.
 * @param {string} icon - The icon type (e.g., 'warning', 'error', 'success', etc.).
 * @param {Function} callback - The function to execute if the user confirms.
 * @returns {Promise<boolean>} - Resolves to `false` if the user cancels, otherwise executes the callback.
 */
export const confirmSwal = async (title, text, icon, callback) => {
  // Create a SweetAlert2 instance with custom button styles
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success parameter-button", // Custom class for the confirm button
      cancelButton: "btn btn-danger", // Custom class for the cancel button
    },
    buttonsStyling: false, // Disable default button styling
  });

  // Display the confirmation dialog
  const result = await swalWithBootstrapButtons.fire({
    title, // Dialog title
    text, // Dialog text
    icon, // Dialog icon
    showCancelButton: true, // Show the cancel button
    confirmButtonText: "Yes", // Text for the confirm button
    cancelButtonText: "No", // Text for the cancel button
    reverseButtons: true, // Reverse the order of the buttons
  });

  // Handle the user's response
  if (result.isConfirmed) {
    callback(); // Execute the callback if the user confirms
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    return false; // Return false if the user cancels
  }
};
