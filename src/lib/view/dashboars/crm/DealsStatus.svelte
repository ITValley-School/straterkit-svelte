<script>

  import SpkBasicCard from "$lib/@spk/SpkBasicCard.svelte";
  import SpkDropdown from "$lib/@spk/uielements/Dropdown/SpkDropdown.svelte";
  import { EarnedDropdown, Status } from "$lib/data/dashboards/crmdashboard.js";
  import { Progress } from "@sveltestrap/sveltestrap";

</script>
<SpkBasicCard cardProps="custom-card" headerTitle="Deals Status" headerTitleProps="" cardBodyProps="" Headerprops="justify-content-between" >
    <div slot="customheader">
        <SpkDropdown   Color="" ToggleClass="p-0 fs-12 text-muted no-caret " Caret={false} parent={`View All<i class="ri-arrow-down-s-line align-middle ms-1 d-inline-block"></i>`} option={EarnedDropdown}/>
    </div>
    <div slot="content">
        <div class="d-flex align-items-center mb-3">
            <h4 class="fw-bold mb-0">4,289</h4>
            <div class="ms-2">
                <span class="badge bg-success-transparent">1.02<i class="ri-arrow-up-s-fill align-mmiddle ms-1"></i></span>
                <span class="text-muted ms-1">compared to last week</span>
            </div>
        </div>
        <Progress multi animated  class="progress-stacked progress-xs mb-4">
            <Progress  bar value={21}   />
            <Progress  bar color="info" value={26}   />
            <Progress  bar color="warning" value={35}   />
            <Progress  bar color="success" value={18}   />
          </Progress>
        <ul class="list-unstyled mb-0 pt-2 crm-deals-status">
            {#each Status as deal}
                <li class={deal.class}>
                <div class="d-flex align-items-center justify-content-between">
                    <div>{deal.status}</div>
                    <div class="fs-12 text-muted">{deal.count} deals</div>
                </div>
                </li>
            {/each}
        </ul>
         </div>
</SpkBasicCard>