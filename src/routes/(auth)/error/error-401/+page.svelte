<script>
  import { Col, Container, Row } from "@sveltestrap/sveltestrap";
  const basePath = __BASE_PATH__;

</script>
<!-- Page Title -->
<svelte:head>
  <title>Error-401 | Ynex - Svelte Admin & Dashboard Template</title>
</svelte:head>
<!-- Page Title Close -->
<div class="page error-bg" id="particles-js">
  <!-- Start::error-page -->
  <div class="error-page">
    <div class="container">
      <div class="text-center p-5 my-auto">
        <Row class=" align-items-center justify-content-center h-100">
          <Col xl={7}>
            <p class="error-text mb-sm-0 mb-2">401</p>
            <p class="fs-18 fw-semibold mb-3">
              Oops &#128557;,The page you are looking for is not available.
            </p>
            <Row class=" justify-content-center mb-5">
              <Col xl={6}>
                <p class="mb-0 op-7">
                  We are sorry for the inconvenience,The page you are trying to
                  access has been removed or never been existed.
                </p>
              </Col>
            </Row>
            <a href={`${basePath}/dashboards/crm`} class="btn btn-primary"
              ><i class="ri-arrow-left-line align-middle me-1 d-inline-block"
              ></i>BACK TO HOME</a
            >
          </Col>
        </Row>
      </div>
    </div>
  </div>
</div>
