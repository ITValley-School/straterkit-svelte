<script>
  // Importing the Toast component from Sveltestrap
  import { Toast } from "@sveltestrap/sveltestrap";

  // Props for controlling the toast's visibility, type, and message
  export let toastParams = { show: false, type: "success", message: "" };

  // Callback function to handle the close event of the toast
  export let onClose = () => {};
</script>

<!-- Toast container positioned at the top-right corner -->
<div class="toast-container position-fixed top-0 end-0 p-3">
  {#if toastParams.show}
    <!-- Toast component with dynamic styles and behavior -->
    <Toast
      id="primaryToast"
      color="primary"
      class={`colored-toast ${
        toastParams.type === "success"
          ? "bg-success"
          : toastParams.type === "warning"
            ? "bg-warning"
            : "bg-danger"
      }-transparent`}
      delay={3000}
      autohide
      aria-atomic="true"
      on:close={onClose}
    >
      <!-- Toast header with dynamic background color and text -->
      <div
        class={`toast-header ${
          toastParams.type === "success"
            ? "bg-success"
            : toastParams.type === "warning"
              ? "bg-warning"
              : "bg-danger"
        } text-fixed-white`}
      >
        <!-- Title based on the toast type -->
        <strong class="me-auto">
          {toastParams.type === "success"
            ? "Success"
            : toastParams.type === "warning"
              ? "Warning"
              : "Error"}
        </strong>
        <!-- Close button for the toast -->
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
          on:click={onClose}
        ></button>
      </div>
      <!-- Toast body displaying the message -->
      <div class="toast-body">{toastParams.message}</div>
    </Toast>
  {/if}
</div>
