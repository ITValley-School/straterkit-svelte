<script>
  // Importing the Spinner component from the Sveltestrap library
  import { Spinner } from "@sveltestrap/sveltestrap";
</script>

<!-- Loading spinner container -->
<div class="loading-container">
  <!-- Spinner component with a light color -->
  <Spinner color="light" />
</div>

<style>
  /* Styles for the loading spinner container */
  .loading-container {
    position: fixed; /* Ensures the spinner stays fixed on the screen */
    width: 100vw; /* Full viewport width */
    height: 100vh; /* Full viewport height */
    left: 0; /* Align to the left edge */
    top: 0; /* Align to the top edge */
    right: 0; /* Align to the right edge */
    bottom: 0; /* Align to the bottom edge */
    display: grid; /* Use grid layout to center the spinner */
    place-items: center; /* Centers the spinner both vertically and horizontally */
    z-index: 1000; /* Ensures the spinner is above other elements */
    background-color: rgba(
      0,
      0,
      0,
      0.5
    ); /* Semi-transparent black background */
  }
</style>
