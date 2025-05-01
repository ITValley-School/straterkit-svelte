<script>
  // You can use Svelte's built-in date handling to get the current year.
  let currentYear = new Date().getFullYear();
</script>

<footer class="footer mt-auto py-3 bg-white text-center">
  <div class="container">
    <span class="text-muted">
      Copyright © {currentYear}&nbsp;
      <!-- svelte-ignore a11y-invalid-attribute -->
      <a href="#!" class="text-dark fw-semibold">Ynex</a>. Designed with
      <span class="bi bi-heart-fill text-danger"></span>
      by
      <a href="https://spruko.com/" target="_blank">
        <span class="fw-semibold text-primary text-decoration-underline"
          >Spruko</span
        >
      </a> All rights reserved
    </span>
  </div>
</footer>
