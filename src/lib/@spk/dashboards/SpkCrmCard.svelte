<script>
    import SpkApexChart from "$lib/@spk/charts/SpkApexChart.svelte";  // Import the chart component

    // Define props to pass dynamic data to the card
    export let title = '';
    export let value = '';
    export let id = '';  // ID for the chart
    export let chartOptions = {};  // Chart options, to be passed to SpkApexChart
    export let iconClass = '';
    export let iconBgClass = 'bg-primary'; // Default background color for icon
    export let percentage = '';
    export let linkText = 'View All';
    export let trendClass = 'text-success'; // Default positive trend
</script>

<div class="col-xxl-6 col-lg-6 col-md-6">
  <div class="card custom-card overflow-hidden">
    <div class="card-body">
      <div class="d-flex align-items-top justify-content-between">
        <div>
          <!-- Icon with background color -->
          <span class={`avatar avatar-md avatar-rounded ${iconBgClass}`}>
            <i class={`ti ${iconClass} fs-16`}></i>
          </span>
        </div>
        <div class="flex-fill ms-3">
          <div class="d-flex align-items-center justify-content-between flex-wrap">
            <!-- Title and value for the card -->
            <div>
              <p class="text-muted mb-0">{title}</p>
              <h4 class="fw-semibold mt-1">{value}</h4>
            </div>
            <!-- Chart component -->
            <SpkApexChart id={id} options={chartOptions} customClass="chart-class" />
          </div>
          <!-- Footer with "View All" link and trend percentage -->
          <div class="d-flex align-items-center justify-content-between mt-1">
            <div>
              <a class={linkText} href="#!">
                View All
                <i class="ti ti-arrow-narrow-right ms-2 fw-semibold d-inline-block"></i>
              </a>
            </div>
            <div class="text-end">
              <p class={`mb-0 ${trendClass} fw-semibold`}>{percentage}</p>
              <span class="text-muted op-7 fs-11">this month</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
