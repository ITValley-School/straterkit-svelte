<script>
    export let homepage = '';
    export let activepage = '';
    export let page = '';
  </script>
  
  <div class="d-md-flex d-block align-items-center justify-content-between my-4 page-header-breadcrumb">
    <h1 class="page-title fw-semibold fs-18 mb-0">{homepage}</h1>
    <div class="ms-md-1 ms-0">
        <nav>
            <ol class="breadcrumb mb-0">
                <!-- svelte-ignore a11y-invalid-attribute -->
                <li class="breadcrumb-item"><a href="#!">{activepage}</a></li>
                <li class="breadcrumb-item active" aria-current="page">{page}</li>
            </ol>
        </nav>
    </div>
</div>

  <style>
    /* Add any specific styles you need here */
  </style>
  