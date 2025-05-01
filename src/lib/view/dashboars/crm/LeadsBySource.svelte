<script>
  import SpkBasicCard from "$lib/@spk/SpkBasicCard.svelte";
  import SpkDropdown from "$lib/@spk/uielements/Dropdown/SpkDropdown.svelte";
  import {
    AllDropdown,
    devices,
    Source,
  } from "$lib/data/dashboards/crmdashboard.js";
  import SpkApexChart from "$lib/@spk/charts/SpkApexChart.svelte";
  import { Row } from "@sveltestrap/sveltestrap";
</script>

<SpkBasicCard
  cardProps="custom-card"
  headerTitle="Leads By Source"
  headerTitleProps=""
  cardBodyProps="p-0 overflow-hidden"
  Headerprops="justify-content-between"
>
  <div slot="customheader">
    <SpkDropdown
      Size="sm"
      Color="light"
      ToggleClass="btn-icon no-caret"
      Caret={false}
      parent={`<i class="fe fe-more-vertical"></i>`}
      option={AllDropdown}
    />
  </div>
  <div slot="content">
    <div
      class="leads-source-chart d-flex align-items-center justify-content-center"
    >
      <SpkApexChart
        id="leads-source"
        options={Source}
        customClass="w-100 p-3"
      />
      <div class="lead-source-value">
        <span class="d-block fs-14">Total</span>
        <span class="d-block fs-25 fw-bold">4,145</span>
      </div>
    </div>
    <Row class=" row-cols-12 border-top border-block-start-dashed">
      {#each devices as device}
        <div class="col p-0">
          <div
            class={`${device.mainClass} text-center ${device.class !== "tablet" ? "border-end border-inline-end-dashed" : ""}`}
          >
            <span
              class={`text-muted fs-12 mb-1 crm-lead-legend ${device.class} d-inline-block`}
              >{device.type}</span
            >
            <div><span class="fs-16 fw-semibold">{device.count}</span></div>
          </div>
        </div>
      {/each}
    </Row>
  </div>
</SpkBasicCard>
