<script>
  import SpkBasicCard from "$lib/@spk/SpkBasicCard.svelte";
  import SpkDropdown from "$lib/@spk/uielements/Dropdown/SpkDropdown.svelte";
  import { AllDropdown, deals } from "$lib/data/dashboards/crmdashboard.js";
</script>
<SpkBasicCard cardProps="custom-card" headerTitle="Top Deals" headerTitleProps="" cardBodyProps="" Headerprops="justify-content-between" >
    <div slot="customheader">
        <SpkDropdown Size="sm"  Color="light" ToggleClass="btn-icon no-caret " Caret={false} parent={`<i class="fe fe-more-vertical"></i>`} option={AllDropdown}/> 
    </div>
    <div slot="content">
        <ul class="list-unstyled crm-top-deals mb-0">
            {#each deals as deal}
              <li>
                <div class="d-flex align-items-top flex-wrap">
                  <div class="me-2">
                    {#if deal.avatar}
                      <span class="avatar avatar-sm avatar-rounded">
                        <img src={deal.avatar} alt={deal.name} />
                      </span>
                    {:else}
                      <span class={`avatar avatar-sm avatar-rounded ${deal.avatarBgColor} fw-semibold`}>
                        {deal.avatarText}
                      </span>
                    {/if}
                  </div>
                  <div class="flex-fill">
                    <p class="fw-semibold mb-0">{deal.name}</p>
                    <span class="text-muted fs-12">{deal.email}</span>
                  </div>
                  <div class="fw-semibold fs-15">{deal.amount}</div>
                </div>
              </li>
            {/each}
          </ul>
    </div>
</SpkBasicCard>