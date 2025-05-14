<script>
  import { Spinner } from "@sveltestrap/sveltestrap";
</script>

<div class="loading-container">
  <Spinner color="light" />
</div>

<style>
  .loading-container {
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: grid;
    place-items: center;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>
